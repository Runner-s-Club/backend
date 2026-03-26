import { Controller, Post, UploadedFiles, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TryonService } from './tryon.service';

@Controller('tryon')
export class TryonController {
  constructor(private readonly tryonService: TryonService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'user_image', maxCount: 1 },
    { name: 'garment_image', maxCount: 1 },
  ]))
  async createTryOn(
    @UploadedFiles() files: { user_image?: Express.Multer.File[], garment_image?: Express.Multer.File[] },
  ) {
    // 1. Validate that the frontend actually sent both files
    if (!files?.user_image || !files?.garment_image) {
      throw new BadRequestException('Both a person and a garment image are required.');
    }

    // 2. Extract the raw binary data (buffers) from the uploaded files
    const personBuffer = files.user_image[0].buffer;
    const garmentBuffer = files.garment_image[0].buffer;

    // 3. Hand the buffers over to the service to talk to Gemini
    const imageBase64 = await this.tryonService.generateTryOnImage(personBuffer, garmentBuffer);

    // 4. Send the generated image back to React
    return { 
      status: 'success',
      // We also add the data:image prefix so the browser knows it's a JPEG!
      result_image_base64: `data:image/jpeg;base64,${imageBase64}` 
    };
  }
}