import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './controller/orders.controller';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrdersService } from './services/orders.service';
import { ProductsModule } from 'src/products/products.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    UsersModule,
    ProductsModule,
    PaymentsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrderModule {}
