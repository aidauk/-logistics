import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Seo, SeoDocument } from '../schemas/seo.schema';
import { Model } from 'mongoose';

@Injectable()
export class SeoService {
  constructor(@InjectModel(Seo.name) private seoModel: Model<SeoDocument>) {}

  async findSeoData(): Promise<SeoDocument> {
    const seoData = await this.seoModel.find();
    return seoData[0];
  }

  async updateSeoData(data: Partial<SeoDocument>): Promise<SeoDocument> {
    const seoData = await this.seoModel.find();

    seoData[0].description = data.description || seoData[0].description;
    seoData[0].keywords = data.keywords || seoData[0].keywords;

    const updatedSeoData = await seoData[0].save();
    return updatedSeoData;
  }
}
