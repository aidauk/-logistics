import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { SeoService } from '../services/seo.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { SeoDocument } from '../schemas/seo.schema';
import { SeoDataDto } from '../dto/seo.dto';

@Controller('seo')
export class SeoController {
  constructor(private seoService: SeoService) {}

  @Get()
  async getSeoData() {
    return await this.seoService.findSeoData();
  }

  @UseGuards(AdminGuard)
  @Put()
  async updateSeoData(@Body() credentials: SeoDataDto) {
    return this.seoService.updateSeoData(credentials);
  }
}
