import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CategoryDto } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';

@Serialize(CategoryDto)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  getCategory(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  async createCategory(@Body() { name }: CategoryDto) {
    const existingCategory = await this.categoriesService.findOne(name);

    if (existingCategory)
      throw new BadRequestException('Category with this name has been added.');

    return this.categoriesService.create({ name });
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteOne(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() credentials: CategoryDto) {
    return this.categoriesService.update(id, credentials);
  }
}
