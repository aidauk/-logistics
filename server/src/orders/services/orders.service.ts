import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking } from 'src/interfaces';
import { Order, OrderDocument } from '../schemas/order.schema';
import { ProductsService } from 'src/products/services/products.service';
import { PaymentsService } from 'src/payments/services/payments.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private productsService: ProductsService,
    private paymentsService: PaymentsService,
    private usersService: UsersService,
  ) {}

  async create(userId: string, productId: string): Promise<OrderDocument> {
    const product = await this.productsService.findById(productId);
    if (product.operation_type === 'sale')
      throw new BadRequestException('Invalid operation type of product');

    const order = await this.findCreatedByUserId(userId);

    const setProfit = {
      currency: product.price.currency,
      amount: product.price.amount * 0.001,
    };

    if (order) {
      if (order.product['_id'].toString() == productId) {
        console.log(1);
        return order;
      }
      console.log(2);
      order.product = product;
      order.profit = setProfit;
      order.booking_info = {} as Booking;
      return await order.save();
    }

    const createdOrder = await this.orderModel.create({
      userId: userId,
      booking_info: {},
      product,
      profit: setProfit,
      state: 'created',
    });

    return createdOrder;
  }

  async findAll(): Promise<OrderDocument[]> {
    const orders = await this.orderModel.find({ state: { $ne: 'created' } });

    return orders;
  }

  async findCreatedByUserId(id: string): Promise<OrderDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const order = await this.orderModel.findOne({
      userId: id,
      state: 'created',
    });

    return order;
  }

  async findMy(id: string): Promise<OrderDocument[]> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const orders = await this.orderModel.find({
      userId: id,
      state: { $ne: 'created' },
    });

    return orders;
  }

  async findById(id: string): Promise<OrderDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid order ID.');

    const order = await this.orderModel.findById(id);

    if (!order) throw new NotFoundException('No order with given ID.');

    return order;
  }

  async findOne(userId: string, id: string): Promise<OrderDocument> {
    const user = await this.usersService.findById(userId);
    const order = await this.findById(id);
    if (!user.isAdmin) {
      if (userId.toString() !== order.userId.toString())
        throw new BadRequestException(
          'You are not admin or that is not your order!',
        );
    }
    return order;
  }

  async update(userId: string, booking_info: Booking): Promise<OrderDocument> {
    const order = await this.orderModel.findOne({ userId, state: 'created' });
    if (!order) throw new NotFoundException('User has not created order yet.');
    const product = await this.productsService.findById(order.product._id);

    const currentDate: Date = new Date();
    const newBooking: any = booking_info;
    const booking_infos: Booking[] = product.bookings;

    // Remove objects from the array whose dates have expired
    const filteredBookings: Booking[] = booking_infos.filter(
      (booking: Booking) => {
        const leavingDate: number = Date.parse(booking.leaving_date);
        return leavingDate > currentDate.getTime() - 1;
      },
    );

    const overlappingBooking: Booking | undefined = filteredBookings.find(
      (booking: Booking) => {
        const entryDate: number = Date.parse(booking.entry_date);
        const leavingDate: number = Date.parse(booking.leaving_date);
        const newEntryDate: number = Date.parse(newBooking.entry_date);
        const newLeavingDate: number = Date.parse(newBooking.leaving_date);

        return (
          (newEntryDate >= entryDate && newEntryDate <= leavingDate) ||
          (newLeavingDate >= entryDate && newLeavingDate <= leavingDate) ||
          (newEntryDate <= entryDate && newLeavingDate >= leavingDate)
        );
      },
    );

    if (
      Date.parse(newBooking.entry_date) < currentDate.getTime() ||
      Date.parse(newBooking.leaving_date) < currentDate.getTime()
    ) {
      throw new BadRequestException(
        'Error: Booking dates cannot be before the current date',
      );
    } else if (
      Date.parse(newBooking.entry_date) >= Date.parse(newBooking.leaving_date)
    ) {
      throw new BadRequestException(
        'Error: The entry date must be earlier than the leaving date',
      );
    } else if (overlappingBooking) {
      throw new BadRequestException('Error: Overlapping booking detected');
    } else {
      filteredBookings.push(newBooking);
    }

    order.booking_info = booking_info;
    order.state = 'pending';

    return await order.save();
  }

  async cancelOrder(id: string): Promise<OrderDocument> {
    const order = await this.orderModel.findById(id);
    order.state = 'canceled';
    order.canceled_at = new Date();
    return await order.save();
  }

  async archiveOrder(id: string): Promise<OrderDocument> {
    const order = await this.orderModel.findById(id);
    order.state = 'archived';
    order.archived_at = new Date();
    return await order.save();
  }

  async updateToPaid(paymentId: string, orderId: string) {
    const order = await this.findById(orderId);
    if (order.state != 'active') {
      const payment = await this.paymentsService.findById(paymentId);

      console.log(order, payment);

      order.isPaid = true;
      order.paid_at = new Date();
      order.paymentId = payment;
      order.state = 'active';

      const updatedProduct = await this.productsService.addBooking(
        order.product._id,
        order.booking_info,
      );

      console.log(updatedProduct);
      await order.save();
      return updatedProduct;
    } else {
      throw new BadRequestException('Order is already active');
    }
  }
}
