import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Param,
  UseGuards,
  Session,
  Delete,
  Body,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from '../services/app.service';
import { deleteImage, ImageStorage } from 'src/utils';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductsService } from 'src/products/services/products.service';
import { NewsService } from 'src/news/services/news.service';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('images')
export class AppController {
  constructor(
    private appService: AppService,
    private prudctsService: ProductsService,
    private newsService: NewsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('products/:id')
  @UseInterceptors(
    FilesInterceptor('images', 20, ImageStorage('./public/product-images')),
  )
  async uploadMultipleProdcutFiles(
    @UploadedFiles() images,
    @Session() session: any,
    @Param('id') id: string,
  ) {
    return await this.prudctsService.addImage(id, session.user._id, images);
  }

  @UseGuards(AdminGuard)
  @Post('news/:id')
  @UseInterceptors(
    FilesInterceptor('images', 10, ImageStorage('./public/news-images')),
  )
  async uploadMultipleNewsFiles(
    @UploadedFiles() images,
    @Param('id') id: string,
  ) {
    return await this.newsService.addImage(id, images);
  }

  @UseGuards(AdminGuard)
  @Post('main')
  @UseInterceptors(
    FileInterceptor('image', ImageStorage('./public/main-image')),
  )
  async uploadMainImage(@UploadedFile() image) {
    return image;
  }

  @UseGuards(AuthGuard)
  @Delete('products/:id')
  async deleteProductImages(
    @Param('id') id: string,
    @Body('imagePaths') imagePaths: string[], // Accept an array of image paths
    @Session() session: any,
  ) {
    try {
      // Delete each image from the file system
      for (const imagePath of imagePaths) {
        await deleteImage(imagePath);
      }

      // Update product details in the database
      await this.prudctsService.removeImages(id, session.user._id, imagePaths);

      return { message: 'Images deleted successfully' };
    } catch (err) {
      throw new Error('Failed to delete images: ' + err.message);
    }
  }

  @UseGuards(AdminGuard)
  @Delete('news/:id')
  async deleteNewsImages(
    @Param('id') id: string,
    @Body('imagePaths') imagePaths: string[], // Accept an array of image paths
  ) {
    try {
      // Delete each image from the file system
      for (const imagePath of imagePaths) {
        await deleteImage(imagePath);
      }

      // Update product details in the database
      await this.newsService.removeImages(id, imagePaths);

      return { message: 'Images deleted successfully' };
    } catch (err) {
      throw new Error('Failed to delete images: ' + err.message);
    }
  }
  @UseGuards(AdminGuard)
  @Delete('main')
  async deleteMainImage() {
    try {
      await deleteImage('public\\main-image\\main.jpg');
      return { message: 'Images deleted successfully' };
    } catch (err) {
      console.log('🚀 ~ AppController ~ deleteMainImage ~ err:', err);
    }
  }
}
