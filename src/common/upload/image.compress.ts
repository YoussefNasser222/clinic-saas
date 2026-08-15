import sharp from 'sharp';

export async function compressImage(
  buffer: Buffer,
  maxWidth = 1200,
  quality = 75,
): Promise<Buffer> {
  return await sharp(buffer)
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
    })
    .webp({
      quality,
    })
    .toBuffer();
}