import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { OrdersService } from '../services/orders.service';
import { BookingDto } from '../dtos/booking.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createOrder(@Body() body: any, @Session() session: any) {
    return await this.ordersService.create(session.user._id, body.productId);
  }

  @UseGuards(AdminGuard)
  @Get()
  async getOrders() {
    return this.ordersService.findAll();
  }

  // @UseGuards(AuthGuard)
  // @Get('myorders')
  // async getUserOrders(@Session() session: any) {
  //   return this.ordersService.findUserOrders(session.user._id);
  // }

  @UseGuards(AuthGuard)
  @Get('my/created')
  async getOrder(@Session() session: any) {
    const order = await this.ordersService.findCreatedByUserId(
      session.user._id,
    );
    if (!order) throw new NotFoundException('User has not created order yet.');
    return order;
  }

  @UseGuards(AuthGuard)
  @Get('my')
  async getMyOrders(@Session() session: any) {
    const orders = await this.ordersService.findMy(session.user._id);
    if (!orders) throw new NotFoundException('User doesnt have any order yet.');
    return orders;
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateBookingInfo(
    @Body() booking: BookingDto,
    @Session() session: any,
  ) {
    console.log('Updating booking info');
    return await this.ordersService.update(session.user._id, booking);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Session() session: any, @Param('id') id: string) {
    return this.ordersService.findOne(session.user._id, id);
  }

  @UseGuards(AdminGuard)
  @Put(':id/cancel')
  async cancelORder(@Param('id') id: string) {
    return this.ordersService.cancelOrder(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id/archive')
  async archiveORder(@Param('id') id: string) {
    return this.ordersService.archiveOrder(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id/pay')
  async updateOrderPayment(
    @Body() { paymentId }: any,
    @Param('id') id: string
  ) {
    console.log('paying');
    return this.ordersService.updateToPaid(paymentId, id);
  }

  // @UseGuards(AdminGuard)
  // @Put(':id/deliver')
  // async updateOrderDelivery(@Param('id') id: string) {
  //   return this.ordersService.updateDelivered(id);
  // }
}
