import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class TryonService {
  private ai: GoogleGenAI;

  constructor() {
    // Explicitly pass the API key from your .env file
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async generateTryOnImage(personBuffer: Buffer, garmentBuffer: Buffer): Promise<string> {
    try {
      // Use generateContent for modern multimodal image composition
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-image',
        contents: [
          // Pass the images directly alongside the prompt
          { inlineData: { mimeType: 'image/jpeg', data: personBuffer.toString('base64') } },
          { inlineData: { mimeType: 'image/jpeg', data: garmentBuffer.toString('base64') } },
          { text: 'Take the person in the first reference image and cleanly composite the clothing from the second reference image onto their body. Do not change the person\'s face, pose, or the original background.' }
        ],
        config: { 
          // Force the AI to output an image instead of a text response
          responseModalities: ['IMAGE']
        },
      });

      // Navigate the response object to extract the new image's base64 string
      const newImageBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (!newImageBase64) {
        throw new Error('No image data returned from Gemini');
      }

      return newImageBase64;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new InternalServerErrorException('Failed to generate the try-on image');
    }
  }
}