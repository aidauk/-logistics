import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { encryptPassword } from 'src/utils';
import { Product, ProductDocument } from 'src/products/schemas/product.schema';
import { ProfileDto } from '../dtos/profile.dto';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>, // private productsService: ProductsService,
  ) {}

  async create(user: Partial<UserDocument>): Promise<UserDocument> {
    const createdUser = await this.userModel.create(user);

    return createdUser;
  }

  async findOne(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<UserDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find();

    return users;
  }

  async deleteOne(id: string): Promise<void> {
    const user = await this.findById(id);

    await user.deleteOne();
  }

  async update(id: string, attrs: ProfileDto): Promise<UserDocument> {
    const user = await this.findById(id);

    const existingUser = await this.findOne(attrs.email);

    if (existingUser)
      throw new BadRequestException('email adress is already in use.');

    user.name = attrs.name || user.name;
    user.phone = attrs.phone || user.phone;
    user.gender = attrs.gender || user.gender;
    user.address = attrs.address || user.address;
    user.email = attrs.email || user.email;
    if (attrs.favorite) {
      user.favorites.push(new Types.ObjectId(attrs.favorite));
    }

    if (attrs.password) {
      user.password = await encryptPassword(attrs.password);
    }

    const updatedUser = await user.save();

    return updatedUser;
  }

  async adminUpdate(id: string, attrs: Partial<UserDocument>) {
    const user = await this.findById(id);

    const existingUser = await this.findOne(attrs.email);

    if (existingUser)
      throw new BadRequestException('email adress is already in use.');

    user.name = attrs.name || user.name;
    user.phone = attrs.phone || user.phone;
    user.address = attrs.address || user.address;
    user.email = attrs.email || user.email;
    user.gender = attrs.gender || user.gender;
    user.isAdmin = attrs.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    return updatedUser;
  }

  async addProduct(user_id: string, product: string): Promise<UserDocument> {
    const user = await this.findById(user_id);

    user.products.push(new Types.ObjectId(product));

    const updatedUser = await user.save();
    return updatedUser;
  }

  async deleteProduct(product: ProductDocument): Promise<void> {
    const user = await this.findById(product.user.toString());
    const index = user.products.indexOf(product._id); // Find the index of the ID in the array

    if (index !== -1) {
      user.products.splice(index, 1); // Remove the ID from the array
    }
    await user.save();
  }

  async deleteMany(): Promise<void> {
    await this.userModel.deleteMany({});
  }

  async addToFavorites(userId: string, productId: string): Promise<User> {
    // Проверка наличия пользователя
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const arr = user.favorites;
    const index = arr.indexOf(new Types.ObjectId(productId));
    if (index > -1) {
      // If the string exists, remove it
      arr.splice(index, 1);
    } else {
      // If the string doesn't exist, add it
      arr.push(new Types.ObjectId(productId));
    }
    const updatedUser = await user.save();
    return updatedUser;
  }
}
