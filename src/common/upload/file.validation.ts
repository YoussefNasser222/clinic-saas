import { BadRequestException } from '@nestjs/common';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export async function validateFileMagicNumber(
  buffer: Buffer,
): Promise<boolean> {
  const { fileTypeFromBuffer } = await import('file-type');
  const type = await fileTypeFromBuffer(buffer);

  if (!type || !ALLOWED_MIME_TYPES.includes(type.mime)) {
    throw new BadRequestException('Invalid file type');
  }

  return true;
}