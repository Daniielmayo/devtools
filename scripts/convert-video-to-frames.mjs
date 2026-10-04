import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const inputVideo = path.resolve("public/Robotic Dog Running and Sitting Oct 3 2026.mp4");
const outputDir = path.resolve("public/frames");
const tempDir = path.resolve("public/temp_png_frames");

async function removeBackgroundAndSave(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const avg = (r + g + b) / 3;
    const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

    // Studio light background detection (high lightness, low color difference)
    if (avg > 200 && diff < 30) {
      if (avg > 225) {
        data[i + 3] = 0; // Completely transparent
      } else {
        // Smooth edge anti-aliasing feather
        const alpha = Math.floor(((225 - avg) / 25) * 255);
        data[i + 3] = Math.max(0, Math.min(255, alpha));
      }
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .webp({ quality: 85, effort: 6 })
    .toFile(outputPath);
}

async function run() {
  console.log("🚀 Extrayendo y convirtiendo fotogramas a WebP TRANSPARENTE...");

  if (!fs.existsSync(inputVideo)) {
    console.error("❌ Archivo no encontrado:", inputVideo);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  // 1. Extraer fotogramas a PNG con FFmpeg a 700px max de ancho
  console.log("📹 Extrayendo fotogramas con FFmpeg...");
  const ffmpegCmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "scale=700:-1" "${path.join(
    tempDir,
    "frame_%04d.png"
  )}"`;
  execSync(ffmpegCmd, { stdio: "inherit" });

  const pngFiles = fs
    .readdirSync(tempDir)
    .filter((f) => f.endsWith(".png"))
    .sort();

  console.log(`📸 Procesando ${pngFiles.length} fotogramas con eliminación de fondo transparente...`);

  let count = 0;
  for (const file of pngFiles) {
    count++;
    const inputPath = path.join(tempDir, file);
    const outputName = `dog_${String(count).padStart(4, "0")}.webp`;
    const outputPath = path.join(outputDir, outputName);

    await removeBackgroundAndSave(inputPath, outputPath);
    if (count % 30 === 0 || count === pngFiles.length) {
      console.log(`Progress: ${count}/${pngFiles.length} fotogramas transparentes procesados.`);
    }
  }

  // Limpiar temporales
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log(`✨ ¡Proceso completado! ${pngFiles.length} fotogramas WebP TRANSPARENTES guardados en public/frames/`);
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
