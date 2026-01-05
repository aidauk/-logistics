import {
  Body,
  ConsoleLogger,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductDto } from '../dtos/product.dto';
import { ReviewDto } from '../dtos/review.dto';
import { ProductsService } from '../services/products.service';
import { CurrencyService } from 'src/currency/services/currency.service';
import { TCurrency } from 'src/common/types';
import { Product } from '../schemas/product.schema';
import { PaginatedProducts } from 'src/interfaces';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private currencyService: CurrencyService,
  ) {}

  @Get()
  async getProducts(
    @Query('city') city?: string,
    @Query('rooms') rooms?: number,
    @Query('entryDate') entryDate?: Date,
    @Query('leavingDate') leavingDate?: Date,
    @Query('pageId') pageId?: string,
    // @Query('currency') currency?: TCurrency,
  ) {
    console.log('get products');
    return await this.productsService.findMany(city, rooms, pageId);
  }

  @UseGuards(AuthGuard)
  @Get('my')
  async getMyProducts(@Session() session: any) {
    return await this.productsService.findUserProducts(session.user._id);
  }

  @Get('/filter')
  async getProductsFilter(
    @Query('category') category: string,
    @Query('city') city: string,
    @Query('comforts_special') comforts_special: string,
    @Query('price_min') price_min: string,
    @Query('price_max') price_max: string,
    @Query('operation_type') operation_type: string,
    @Query('entry_date') entry_date: string,
    @Query('leaving_date') leaving_date: string,
    @Query('rooms') rooms: string,
    @Query('sort_by') sort_by: string,
    @Query('sort_order') sort_order: string,
    @Query('pageId') pageId: string,
    @Query('currency') currency?: TCurrency,
  ): Promise<PaginatedProducts> {
    const filters = {
      operation_type,
      entry_date,
      leaving_date,
      category,
      city,
      comforts_special,
      price_min,
      price_max,
      rooms,
      pageId,
      currency,
    };

    const sortBy = { field: sort_by, order: sort_order };

    return await this.productsService.findAll(filters, sortBy);
  }

  // @Get('available')
  // async getAvailableProducts(
  //   @Query('city') city: string,
  //   @Query('category') category: string,

  //   @Query('rooms') rooms: string,
  // ): Promise<Product[]> {
  //   const filters = {
  //     operation_type,
  //     city,
  //     category,
  //     entry_date,
  //     leaving_date,
  //     rooms,
  //   };
  //   return this.productsService.findAvailableProducts(filters);
  // }

  @UseGuards(AdminGuard)
  @Get('user/:id')
  async getUserProducts(@Param('id') id: string) {
    console.log('hello');
    return await this.productsService.findUserProducts(id);
  }

  @Get('topRated')
  async getTopRatedProducts() {
    return await this.productsService.findTopRated();
  }

  @Get('activated')
  async getActivateedProducts() {
    return await this.productsService.findTopRated();
  }

  @UseGuards(AuthGuard)
  @Get('favorites')
  async getFavoritesOfUser(@Session() session: any) {
    return await this.productsService.findUserFavorites(session.user._id);
  }

  @Get(':id/activated')
  async getActivatedProduct(
    @Param('id') id: string,
    @Query('currency') currency?: TCurrency,
  ) {
    return await this.productsService.findByIdActivated(id, currency);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productsService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createProduct(@Body() product: ProductDto, @Session() session: any) {
    return await this.productsService.create(session.user._id, product);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() credentials: ProductDto,
    @Session() session: any,
  ) {
    console.log('updating product');
    return await this.productsService.update(id, session.user._id, credentials);
  }

  @UseGuards(AuthGuard)
  @Put(':id/disactivate')
  async disactivateProduct(@Param('id') id: string, @Session() session: any) {
    return await this.productsService.disactivate(id, session.user._id);
  }

  @UseGuards(AdminGuard)
  @Put(':id/activate')
  async avtivate(@Param('id') id: string) {
    return await this.productsService.activate(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id/review')
  createReview(
    @Param('id') id: string,
    @Body() review: ReviewDto,
    @Session() session: any,
  ) {
    return this.productsService.createReview(id, session.user, review);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteByUser(@Param('id') id: string, @Session() session: any) {
    console.log('deleting');
    await this.productsService.deleteOne(session.user._id, id);
  }
}
