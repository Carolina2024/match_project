import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { configCloudinary } from 'src/config/cloudinary';

@Module({
  providers: [FilesService, configCloudinary],
  exports: [FilesService]
})
export class FilesModule {}
