import Foundation
import AVFoundation
import CoreGraphics
import ImageIO
import CoreMedia
import VideoToolbox

let fileManager = FileManager.default
let currentDir = URL(fileURLWithPath: fileManager.currentDirectoryPath)
let lpDir = currentDir.appendingPathComponent("lps/gravetos_escuro")
let rawDir = lpDir.appendingPathComponent("raw")
let videoDir = lpDir.appendingPathComponent("video")
let coverPath = lpDir.appendingPathComponent("booklet/cover-3000x3000.jpg")
let tempSegmentURL = videoDir.appendingPathComponent("temp_cover_segment.mp4")
let outputURL = videoDir.appendingPathComponent("gravetos-no-escuro-full-album-4k.mp4")

try? fileManager.removeItem(at: tempSegmentURL)
try? fileManager.removeItem(at: outputURL)

print("==> [1/3] Preparando quadro 4K (3840x2160) com a arte da capa...")

guard let imageSource = CGImageSourceCreateWithURL(coverPath as CFURL, nil),
      let coverCGImage = CGImageSourceCreateImageAtIndex(imageSource, 0, nil) else {
    fputs("Erro ao carregar imagem da capa em \(coverPath.path)\n", stderr)
    exit(1)
}

let width = 3840
let height = 2160

var pixelBuffer: CVPixelBuffer?
let attrs: [CFString: Any] = [
    kCVPixelBufferCGImageCompatibilityKey: true,
    kCVPixelBufferCGBitmapContextCompatibilityKey: true
]
CVPixelBufferCreate(kCFAllocatorDefault, width, height, kCVPixelFormatType_32ARGB, attrs as CFDictionary, &pixelBuffer)

guard let pb = pixelBuffer else {
    fputs("Erro ao criar CVPixelBuffer\n", stderr)
    exit(1)
}

CVPixelBufferLockBaseAddress(pb, [])
let context = CGContext(
    data: CVPixelBufferGetBaseAddress(pb),
    width: width,
    height: height,
    bitsPerComponent: 8,
    bytesPerRow: CVPixelBufferGetBytesPerRow(pb),
    space: CGColorSpaceCreateDeviceRGB(),
    bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue
)!

// Fundo escuro quente (#110d0a)
context.setFillColor(red: 17.0/255.0, green: 13.0/255.0, blue: 10.0/255.0, alpha: 1.0)
context.fill(CGRect(x: 0, y: 0, width: width, height: height))

// Desenha a capa centralizada (2160x2160)
let coverSize = CGFloat(height)
let xOffset = (CGFloat(width) - coverSize) / 2.0
context.interpolationQuality = .high
context.draw(coverCGImage, in: CGRect(x: xOffset, y: 0, width: coverSize, height: coverSize))
CVPixelBufferUnlockBaseAddress(pb, [])

// Cria um segmento base de 10 segundos em 4K H.264
let writer = try AVAssetWriter(outputURL: tempSegmentURL, fileType: .mp4)
let videoSettings: [String: Any] = [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: width,
    AVVideoHeightKey: height,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: 8_000_000,
        AVVideoMaxKeyFrameIntervalKey: 10
    ]
]
let writerInput = AVAssetWriterInput(mediaType: .video, outputSettings: videoSettings)
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: writerInput, sourcePixelBufferAttributes: nil)
writer.add(writerInput)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

// Escreve frames para 10 segundos (1 fps)
for sec in 0...10 {
    while !writerInput.isReadyForMoreMediaData {
        Thread.sleep(forTimeInterval: 0.01)
    }
    let time = CMTime(seconds: Double(sec), preferredTimescale: 600)
    adaptor.append(pb, withPresentationTime: time)
}
writerInput.markAsFinished()

let writerGroup = DispatchGroup()
writerGroup.enter()
writer.finishWriting {
    writerGroup.leave()
}
writerGroup.wait()

print("==> [2/3] Concatenando as 9 faixas de áudio (+3.5s de silêncio dramático após a Faixa 05)...")

let trackFiles = [
    "01-heranca-de-sal.mp3",
    "02-a-mascara-racha.mp3",
    "03-o-intruso-de-terno.mp3",
    "04-o-saldo-nao-da.mp3",
    "05-partiu-sem-sair-do-lugar.mp3",
    "06-ancora-no-olhar.mp3",
    "07-a-ponte-que-nao-quebra.mp3",
    "08-o-nosso-altar.mp3",
    "09-isso-e-um-tunel.mp3"
]

let composition = AVMutableComposition()
guard let compAudioTrack = composition.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid),
      let compVideoTrack = composition.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid) else {
    fputs("Erro ao criar trilhas da composição\n", stderr)
    exit(1)
}

var cursorTime = CMTime.zero

for (index, fileName) in trackFiles.enumerated() {
    let audioURL = rawDir.appendingPathComponent(fileName)
    let asset = AVURLAsset(url: audioURL)
    let duration = asset.duration
    if let assetTrack = asset.tracks(withMediaType: .audio).first {
        try compAudioTrack.insertTimeRange(
            CMTimeRange(start: .zero, duration: duration),
            of: assetTrack,
            at: cursorTime
        )
    }
    let mins = Int(CMTimeGetSeconds(cursorTime)) / 60
    let secs = Int(CMTimeGetSeconds(cursorTime)) % 60
    print(String(format: "    %02d:%02d -> %@", mins, secs, fileName))

    cursorTime = CMTimeAdd(cursorTime, duration)
    // Pausa dramática de 3.5s após a Faixa 05 (índice 4)
    if index == 4 {
        let pause = CMTime(seconds: 3.5, preferredTimescale: 600)
        cursorTime = CMTimeAdd(cursorTime, pause)
    }
}

// Preenche a trilha de vídeo com o segmento 4K até cobrir toda a duração do álbum
let segmentAsset = AVURLAsset(url: tempSegmentURL)
guard let segmentVideoTrack = segmentAsset.tracks(withMediaType: .video).first else {
    fputs("Erro ao ler trilha de vídeo base\n", stderr)
    exit(1)
}

let segDuration = CMTime(seconds: 10.0, preferredTimescale: 600)
var videoCursor = CMTime.zero
while CMTimeCompare(videoCursor, cursorTime) < 0 {
    let remaining = CMTimeSubtract(cursorTime, videoCursor)
    let chunk = CMTimeMinimum(segDuration, remaining)
    try compVideoTrack.insertTimeRange(
        CMTimeRange(start: .zero, duration: chunk),
        of: segmentVideoTrack,
        at: videoCursor
    )
    videoCursor = CMTimeAdd(videoCursor, chunk)
}

print("==> [3/3] Exportando vídeo final 4K para \(outputURL.path)...")

guard let exporter = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetHighestQuality) else {
    fputs("Erro ao criar AVAssetExportSession\n", stderr)
    exit(1)
}

exporter.outputURL = outputURL
exporter.outputFileType = .mp4
exporter.shouldOptimizeForNetworkUse = true

let exportGroup = DispatchGroup()
exportGroup.enter()
exporter.exportAsynchronously {
    exportGroup.leave()
}
exportGroup.wait()

try? fileManager.removeItem(at: tempSegmentURL)

if exporter.status == .completed {
    print("==> Vídeo 4K gerado com sucesso em: \(outputURL.path)")
} else {
    fputs("Erro na exportação: \(String(describing: exporter.error))\n", stderr)
    exit(1)
}
