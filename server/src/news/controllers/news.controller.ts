import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { NewsDto } from '../dto/news.dto';
import { NewsDocument } from '../schemas/news.schema';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}
  @Get()
  getNews() {
    return this.newsService.findAll();
  }

  @Get(':id')
  async getSingleNews(@Param('id') id: string) {
    return await this.newsService.findById(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  async createNews(
    @Body() credentials: NewsDto
  ) {
    return this.newsService.create(credentials);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.newsService.deleteOne(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async updateNews(
    @Param('id') id: string,
    @Body() credentials: Partial<NewsDocument>
  ) {
    return this.newsService.update(id, credentials);
  }
  
}
