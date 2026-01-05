import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controller/products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { CurrencyModule } from 'src/currency/currency.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    UsersModule,
    CategoriesModule,
    CurrencyModule
  ],
  providers: [ProductsService],
  controllers: [ProductsController],  
  exports: [ProductsService],
})
export class ProductsModule {}
