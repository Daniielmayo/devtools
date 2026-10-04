import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const inputVideo = path.resolve("public/Robotic Dog Running and Sitting Oct 3 2026.mp4");
const outputDir = path.resolve("public/frames");
const tempDir = path.resolve("public/temp_png_frames");

async function run() {
  console.log("🚀 Iniciando procesamiento de video a fotogramas WebP...");

  if (!fs.existsSync(inputVideo)) {
    console.error("❌ No se encontró el archivo de video de entrada:", inputVideo);
    process.exit(1);
  }

  // Asegurar directorios
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  // 1. Extraer fotogramas a PNG con FFmpeg
  console.log("📹 Extrayendo fotogramas con FFmpeg...");
  const ffmpegCmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "scale=800:-1" "${path.join(
    tempDir,
    "frame_%04d.png"
  )}"`;
  execSync(ffmpegCmd, { stdio: "inherit" });

  const pngFiles = fs
    .readdirSync(tempDir)
    .filter((f) => f.endsWith(".png"))
    .sort();

  console.log(`📸 Convertiendo ${pngFiles.length} fotogramas a formato WebP optimizado (~80% calidad)...`);

  // 2. Convertir cada PNG a WebP usando Sharp
  let count = 0;
  for (const file of pngFiles) {
    count++;
    const inputPath = path.join(tempDir, file);
    const outputName = `dog_${String(count).padStart(4, "0")}.webp`;
    const outputPath = path.join(outputDir, outputName);

    await sharp(inputPath)
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);
  }

  // 3. Limpiar directorio temporal
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log(`✨ ¡Proceso completado con éxito! ${pngFiles.length} fotogramas WebP guardados en: public/frames/`);
}

run().catch((err) => {
  console.error("Error procesando los fotogramas:", err);
  process.exit(1);
});
