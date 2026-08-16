// prescription-extractor.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrescriptionExtractorService {
  private genAI: GoogleGenerativeAI;

  constructor(private readonly configService: ConfigService) {
    this.genAI = new GoogleGenerativeAI(
      this.configService.get('GEMINI_API_KEY')!,
    );
  }

  private async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async extractFromImage(buffer: Buffer, mimeType: string) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });

    const prompt = `You are reading a medical prescription image.
Respond with ONLY valid JSON, no markdown fences, no extra text:
{
  "diagnosis": string | null,
  "medications": [{ "name": string, "dosage": string, "frequency": string, "duration": string }],
  "notes": string | null
}
If any field is unclear or unreadable, use null. Never guess a dosage you cannot read clearly.`;

    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const result = await model.generateContent([
          prompt,
          { inlineData: { data: buffer.toString('base64'), mimeType } },
        ]);

        const text = result.response.text();
        const cleaned = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleaned);
      } catch (error: any) {
  lastError = error;
  console.error('Gemini error details:', {
    status: error?.status,
    message: error?.message,
    finishReason: error?.response?.candidates?.[0]?.finishReason,
  });
  const isOverloaded = error?.status === 503;
  if (isOverloaded && attempt < maxRetries - 1) {
    const delay = 1000 * Math.pow(2, attempt);
    await this.sleep(delay);
    continue;
  }
  break;
}
    }
    throw new BadRequestException(
      'AI service is temporarily unavailable, please try again in a moment',
    );
  }
}