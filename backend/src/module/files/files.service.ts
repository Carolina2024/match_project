import { Injectable } from "@nestjs/common";
import * as toStream from 'buffer-to-stream';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FilesService{
    async uploadImageToCloudinary(file: Express.Multer.File): Promise<string> {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: 'pets' },
          (error, result) => {
            if (error || !result){
              return reject(error || new Error('Error al subir la imagen'));
            };
            resolve(result.secure_url);
          },
        );
        toStream(file.buffer).pipe(uploadStream);
      });
    }
}