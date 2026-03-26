import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class TryonService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async generateTryOnImage(personBuffer: Buffer, garmentBuffer: Buffer): Promise<string> {
    
    // ==========================================
    // MOCK MODE: Bypass Gemini API to test UI
    // ==========================================
    
    // 1. Simulate a 2-second network delay to test React's loading state
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 2. Return a valid Base64 string of a tiny red square
    const mockRedPixel = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    
    return mockRedPixel;

    // ==========================================
    // REAL API CODE (Commented out for now)
    // ==========================================
    /*
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: [
          { inlineData: { mimeType: 'image/jpeg', data: personBuffer.toString('base64') } },
          { inlineData: { mimeType: 'image/jpeg', data: garmentBuffer.toString('base64') } },
          { text: 'Take the person in the first reference image and cleanly composite the clothing from the second reference image onto their body. Do not change the person\'s face, pose, or the original background.' }
        ],
        config: { 
          responseModalities: ['IMAGE']
        },
      });

      const newImageBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (!newImageBase64) {
        throw new Error('No image data returned from Gemini');
      }

      return newImageBase64;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new InternalServerErrorException('Failed to generate the try-on image');
    }
    */
  }
}