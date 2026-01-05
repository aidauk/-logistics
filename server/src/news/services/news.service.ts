import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { News, NewsDocument } from '../schemas/news.schema';
import { Model, Types } from 'mongoose';
import { Image } from 'src/interfaces';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}

  async create(details: Partial<NewsDocument>): Promise<NewsDocument> {
    const createdUser = await this.newsModel.create(details);

    return createdUser;
  }

  async findById(id: string): Promise<NewsDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid news ID.');

    const singleNews = await this.newsModel.findById(id);

    if (!singleNews) throw new NotFoundException('News not found.');

    return singleNews;
  }

  async findAll(): Promise<NewsDocument[]> {
    const news = await this.newsModel.find();

    return news;
  }

  async deleteOne(id: string): Promise<void> {
    const singleNews = await this.findById(id);

    await singleNews.deleteOne();
  }

  async update(
    id: string,
    attrs: Partial<NewsDocument>,
  ): Promise<NewsDocument> {
    const singleNews = await this.findById(id);

    singleNews.title = attrs.title || singleNews.title;
    singleNews.description = attrs.description || singleNews.description;

    const updatedNews = await singleNews.save();

    return updatedNews;
  }

  async removeImages(id: string, pathnames: string[]) {
    const singleNews = await this.findById(id);
    // Filter out the images that have matching pathnames
    singleNews.images = singleNews.images.filter(
      (image: any) => !pathnames.includes(image.path),
    );

    const updatedNews = await singleNews.save();
    return updatedNews;
  }

  
  async addImage(id: string, newsImages: Image[]) {
    const baseUrl = 'http://localhost:8063';
    
    const singleNews = await this.findById(id);
    
    for (const image of newsImages) {
      singleNews.images.push({
        path: image.path,
        filename: image.filename,
        size: image.size,
        uri: `${baseUrl}/news-images/` + image.filename,
      });
    }

    const updatedNews = await singleNews.save();
    return updatedNews;
  }
}
