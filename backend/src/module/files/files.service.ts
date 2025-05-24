import { Injectable } from '@nestjs/common';
import * as toStream from 'buffer-to-stream';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiOptions } from 'cloudinary';

@Injectable()
export class FilesService {
  async uploadImageToCloudinary(
    file: Express.Multer.File,
    options: Partial<UploadApiOptions> = {},
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'pets',
          transformation: [
            { width: 350, height: 350, crop: 'fill' },
            { quality: 'auto' },
            { fetch_format: 'webp' },
          ],
          ...options,
        },
        (error, result) => {
          if (error || !result) {
            return reject(new Error('Error al subir la imagen'));
          }
          resolve(result.secure_url);
        },
      );
      toStream(file.buffer).pipe(uploadStream);
    });
  }
}
