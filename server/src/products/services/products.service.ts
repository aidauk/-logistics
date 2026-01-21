import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Image, PaginatedProducts } from 'src/interfaces';
import { UserDocument } from 'src/users/schemas/user.schema';
import { Product, ProductDocument } from '../schemas/product.schema';
import { UsersService } from 'src/users/services/users.service';
import { CategoriesService } from 'src/categories/services/categories.service';
import { Booking } from 'src/orders/schemas/order.schema';
import { CurrencyService } from 'src/currency/services/currency.service';
import { ECurrency } from 'src/common/constants';
import { TCurrency } from 'src/common/types';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private currencyService: CurrencyService,
  ) {}

  async findTopRated(): Promise<ProductDocument[]> {
    const products = await this.productModel
      .find({})
      .sort({ rating: -1 })
      .limit(3);

    if (!products.length) throw new NotFoundException('No products found.');

    return products;
  }

  async findAll(filters: any, sortBy: any): Promise<PaginatedProducts> {
    const { operation_type, city, category, entry_date, leaving_date, rooms } =
      filters;

    // Construct initial filters (excluding price filtering)
    const queryFilters: any = {
      state: 'activated',
      operation_type: operation_type || { $exists: true },
      'address.city': city || { $exists: true },
      category: category || { $exists: true },
      rooms: rooms ? parseInt(rooms, 10) : { $exists: true },
    };

    const pageSize = 18;
    const page = parseInt(filters.pageId, 10) || 1;

    const entryDate = entry_date ? new Date(entry_date) : null;
    const leavingDate = leaving_date ? new Date(leaving_date) : null;

    if (entryDate && leavingDate) {
      queryFilters['bookings'] = {
        $not: {
          $elemMatch: {
            $or: [
              { entry_date: { $lte: leavingDate, $gte: entryDate } },
              { leaving_date: { $lte: leavingDate, $gte: entryDate } },
              {
                entry_date: { $lte: entryDate },
                leaving_date: { $gte: leavingDate },
              },
            ],
          },
        },
      };
    }

    // Filter by comforts.special
    if (filters.comforts_special) {
      const comfortsArray = filters.comforts_special
        .split(',')
        .map((item: string) => item.trim());
      queryFilters['comforts.special'] = { $in: comfortsArray };
    }

    // Fetch all products that match the basic filters
    let products = await this.productModel.find(queryFilters).exec();

    // Convert all product prices to specified currency if needed
    if (filters.currency) {
      for (const product of products) {
        product.price.amount = await this.currencyService.convert(
          product.price.currency,
          filters.currency,
          product.price.amount,
        );
        product.price.currency = filters.currency;
      }
    }

    // Apply in-memory price filter based on converted currency
    if (filters.price_min || filters.price_max) {
      const minPrice = filters.price_min
        ? parseInt(filters.price_min, 10)
        : null;
      const maxPrice = filters.price_max
        ? parseInt(filters.price_max, 10)
        : null;

      products = products.filter((product) => {
        const price = product.price.amount;
        return (
          (minPrice === null || price >= minPrice) &&
          (maxPrice === null || price <= maxPrice)
        );
      });
    }

    // Apply sorting
  if (sortBy) {
    const { field, order } = sortBy;
    const sortOrder = order === 'desc' ? -1 : 1;
    products.sort((a, b) => {
      if (a[field] < b[field]) return -1 * sortOrder;
      if (a[field] > b[field]) return 1 * sortOrder;
      return 0;
    });
  }
  
    // Calculate pagination
    const count = products.length;
    const paginatedProducts = products.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    // Return paginated result
    return {
      products: paginatedProducts,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      pageSize,
    };
  }

  // Поиск свободных продуктов по интервалу времени и фильтрам
  async findAvailableProducts(filters: any): Promise<Product[]> {
    const { operation_type, city, category, entry_date, leaving_date, rooms } =
      filters;

    const queryFilters = {
      operation_type: operation_type || { $exists: true },
      'address.city': city || { $exists: true },
      category: category || { $exists: true },
      rooms: rooms ? parseInt(rooms) : { $exists: true },
      state: 'activated',
    };

    // Проверка на наличие бронирований в указанный интервал времени
    const entryDate = new Date(entry_date);
    const leavingDate = new Date(leaving_date);

    console.log(entryDate, leavingDate);

    queryFilters['bookings'] = {
      $not: {
        $elemMatch: {
          $or: [
            {
              entry_date: { $lte: leavingDate, $gte: entryDate },
            },
            {
              leaving_date: { $lte: leavingDate, $gte: entryDate },
            },
            {
              entry_date: { $lte: entryDate },
              leaving_date: { $gte: leavingDate },
            },
          ],
        },
      },
    };

    return this.productModel.find(queryFilters).exec();
  }

  // async findMany(
  //   keyword?: string,
  //   pageId?: string,
  // ): Promise<PaginatedProducts> {
  //   const pageSize = 9;
  //   const page = parseInt(pageId) || 1;

  //   const rgex = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

  //   const count = await this.productModel.countDocuments({ ...rgex });
  //   const products = await this.productModel
  //     .find({ ...rgex })
  //     .limit(pageSize)
  //     .skip(pageSize * (page - 1));

  //   if (!products.length) throw new NotFoundException('No products found.');

  //   return { products, page, pages: Math.ceil(count / pageSize) };
  // }

  // async findMany(
  //   city?: string,
  //   rooms?: number,
  //   pageId?: string,
  // ): Promise<PaginatedProducts> {
  //   const pageSize = 9;
  //   const page = parseInt(pageId) || 1;

  //   const count = await this.productModel.countDocuments({ city });
  //   const products = await this.productModel
  //     .find({ city, rooms })
  //     .limit(pageSize)
  //     .skip(pageSize * (page - 1));

  //   if (!products.length) throw new NotFoundException('No products found.');

  //   return { products, page, pages: Math.ceil(count / pageSize) };
  // }

  async findMany(
    city?: string,
    rooms?: number,
    pageId?: string,
  ): Promise<PaginatedProducts> {
    const pageSize = 6;
    const page = parseInt(pageId) || 1;

    const query: any = {};

    if (city) {
      query.city = city;
    }

    if (rooms) {
      query.rooms = rooms;
    }

    const count = await this.productModel.countDocuments(query);
    const selectedFrom = pageSize * (page - 1);
    const selectedTo = selectedFrom + ((count - selectedFrom) % pageSize);
    const products = await this.productModel
      .find()
      .limit(pageSize)
      .skip(selectedFrom);

    return {
      products,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      pageSize,
    };
  }

  //   async findMany(
  //     city?: string,
  //     rooms?: number,
  //     entryDate?: Date,
  //     leavingDate?: Date,
  //     pageId?: string,
  //   ): Promise<PaginatedProducts> {
  //     const pageSize = 9;
  //     const page = parseInt(pageId) || 1;

  //     // const products = await this.productModel.find()
  //     // products.map(product => {
  //     //   if(product.bookings.length > 0){
  //     //     product.bookings.forEach(booking => {
  //     //       const entry_date = booking.entry_date;
  //     //       const leaving_date = booking.leaving_date;
  //     //       return [
  //     //         {
  //     //           $and: [
  //     //             { "bookings.entry_date": { $gte: entryDate } },
  //     //             { $or: [
  //     //               { "bookings.leaving_date": { $lte: leavingDate } },
  //     //               { "bookings.leaving_date": { $exists: false } }
  //     //             ]}
  //     //           ]
  //     //         },
  //     //         { "bookings": { $exists: false } }
  //     //       ]
  //     //     })
  //     //   }
  //     // })

  //     const query: any = {
  //       $or: [
  //         {
  //           $and: [
  //             { $or: [{ "bookings": { $exists: false } }, { "bookings.entry_date": { $gt: leavingDate } }] },
  //             { $or: [{ "bookings": { $exists: false } }, { "bookings.leaving_date": { $lt: entryDate } }] }
  //           ]
  //         },
  //         { "bookings": [] }
  //       ]
  //     };

  //     if (city) {
  //       query.city = city;
  //     }

  //     if (rooms) {
  //       query.rooms = rooms;
  //     }

  //     const count = await this.productModel.countDocuments(query);
  //     const products = await this.productModel
  //       .find(query)
  //       .limit(pageSize)
  //       .skip(pageSize * (page - 1));

  //     if (!products.length) throw new NotFoundException('No products found.');

  //     return { products, page, pages: Math.ceil(count / pageSize) };
  // }

  async findActivated(): Promise<ProductDocument[]> {
    const products = await this.productModel.find({ state: 'activated' });

    if (!products) throw new NotFoundException('No products activated.');

    return products;
  }

  async findByIdActivated(
    id: string,
    currency: TCurrency,
  ): Promise<ProductDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid product ID.');

    const product = await this.productModel.findOne({
      _id: id,
      state: 'activated',
    });

    if (currency) {
      product.price.amount = await this.currencyService.convert(
        product.price.currency,
        currency,
        product.price.amount,
      );
      product.price.currency = currency;
    }

    if (!product)
      throw new NotFoundException('No activated product with given ID.');

    return product;
  }

  async findById(id: string): Promise<ProductDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid product ID.');

    const product = await this.productModel.findById(id);

    if (!product) throw new NotFoundException('No product with given ID.');

    return product;
  }

  async findUserProducts(id: string): Promise<ProductDocument[]> {
    await this.usersService.findById(id);

    const products = await this.productModel.find({ user: id });

    if (!products)
      throw new NotFoundException('No products with given user ID.');

    return products;
  }

  async findUserFavorites(user_id: string): Promise<ProductDocument[]> {
    const user = await this.usersService.findById(user_id);
    const products: ProductDocument[] = [] as ProductDocument[];
    if (user && user.favorites.length > 0) {
      for (const productId of user.favorites) {
        console.log('Productid', productId.toString());
        const product = await this.productModel.findById(productId.toString());
        if (product) {
          products.push(product);
        }
      }
    } else {
      throw new NotFoundException('No favorites found.');
    }

    return products;
  }

  async create(
    userId: string,
    credentials: Partial<ProductDocument>,
  ): Promise<ProductDocument> {
    await this.usersService.findById(userId);

    const product = {
      ...credentials,
      state: 'pending',
      user: userId,
    };

    const newProduct = await this.productModel.create(product);
    await this.usersService.addProduct(userId, newProduct._id);
    return newProduct;
  }

  async addBooking(id: string, bookingInfo: Booking): Promise<ProductDocument> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $push: { bookings: bookingInfo } },
      { new: true }, // Return the updated document
    );
    console.log('🚀 ~ ProductsService ~ updatedProduct:', updatedProduct);
    return updatedProduct;
  }

  // async addBooking(id: string, bookingInfo: Booking): Promise<ProductDocument> {
  //   const product = await this.findById(id);
  //   product.bookings.push(bookingInfo);

  //   const updatedProduct = await product.save();
  //   console.log('🚀 ~ ProductsService ~ updatedProduct:', updatedProduct);
  //   return updatedProduct;
  // }

  async activate(id: string): Promise<ProductDocument> {
    const product = await this.findById(id);
    product.state = 'activated';

    return await product.save();
  }

  async createReview(
    id: string,
    user: Partial<UserDocument>,
    attrs: any,
  ): Promise<ProductDocument> {
    const product = await this.findById(id);

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === user._id.toString(),
    );

    if (alreadyReviewed)
      throw new BadRequestException('Product already reviewed!');

    const { name, city, rating, comment } = attrs;

    const review = {
      name,
      city,
      rating,
      comment,
      user: user._id,
      createdAt: new Date(),
    };

    product.reviews.push(review);

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    product.numReviews = product.reviews.length;

    const updatedProduct = await product.save();

    return updatedProduct;
  }

  async userChecker(id: string, user_id: string) {
    const user = await this.usersService.findById(user_id);

    const product = await this.findById(id);

    if (!user.isAdmin) {
      if (user_id.toString() !== product.user.toString())
        throw new BadRequestException(
          'Product not found or you do not have permission to modify it.',
        );
    }

    return { product, user };
  }

  async update(
    id: string,
    user_id: string,
    attrs: Partial<ProductDocument>,
  ): Promise<ProductDocument> {
    const { product } = await this.userChecker(id, user_id);
    const foundCategory = await this.categoriesService.findById(
      attrs.category.toString(),
    );

    product.name = attrs.name;
    product.contact = attrs.contact;
    product.address = attrs.address;
    product.category = foundCategory;
    product.operation_type = attrs.operation_type;
    product.comforts = attrs.comforts;
    product.description = attrs.description;
    product.price = attrs.price;
    product.rooms = attrs.rooms;

    const updatedProduct = await product.save();
    return updatedProduct;
  }

  async disactivate(id: string, user_id: string): Promise<ProductDocument> {
    const { product } = await this.userChecker(id, user_id);
    product.state = 'disactivated';

    return await product.save();
  }

  async removeImages(id: string, user_id: string, pathnames: string[]) {
    const { product } = await this.userChecker(id, user_id);

    // Filter out the images that have matching pathnames
    product.images = product.images.filter(
      (image: any) => !pathnames.includes(image.path),
    );

    const updatedProduct = await product.save();
    return updatedProduct;
  }

  async addImage(productId: string, userId: string, productImages: Image[]) {
    const baseUrl = 'http://localhost:8063';

    const { product } = await this.userChecker(productId, userId);

    for (const image of productImages) {
      product.images.push({
        path: image.path,
        filename: image.filename,
        size: image.size,
        uri: `${baseUrl}/product-images/` + image.filename,
      });
    }

    const updatedProduct = await product.save();
    return updatedProduct;
  }
  async deleteOne(user_id: string, id: string): Promise<void> {
    const { product } = await this.userChecker(id, user_id);

    await this.usersService.deleteProduct(product);

    await product.deleteOne();
  }

  async deleteMany(): Promise<void> {
    await this.productModel.deleteMany({});
  }
}
