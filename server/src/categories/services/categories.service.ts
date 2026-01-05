import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(category: Partial<CategoryDocument>): Promise<CategoryDocument> {
    const createdCategory = await this.categoryModel.create(category);

    return createdCategory;
  }

  async findOne(name: string): Promise<CategoryDocument> {
    const category = await this.categoryModel.findOne({ name });

    return category;
  }

  async findById(id: string): Promise<CategoryDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid ID.');

    const category = await this.categoryModel.findById(id);

    if (!category) throw new NotFoundException('Category not found.');

    return category;
  }

  async findAll(): Promise<CategoryDocument[]> {
    return await this.categoryModel.find();
  }

  async deleteOne(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid ID.');

    const category = await this.categoryModel.findById(id);

    if (!category) throw new NotFoundException('Category not found.');

    await category.deleteOne();
  }

  async update(
    id: string,
    attrs: Partial<CategoryDocument>,
  ): Promise<CategoryDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid ID.');

    const category = await this.categoryModel.findById(id);

    if (!category) throw new NotFoundException('Category not found.');

    const existingCategory = await this.findOne(attrs.name);

    if (existingCategory)
      throw new BadRequestException('Category with this name has been added.');

    category.name = attrs.name || category.name;

    const updatedCategory = await category.save();

    return updatedCategory;
  }
}
