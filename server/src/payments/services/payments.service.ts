import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentsDocument } from '../schemas/payments.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentsDocument>,
  ) {}

  async create(): Promise<PaymentsDocument> {
    const createdPayment = await this.paymentModel.create({});

    return createdPayment;
  }

  async findById(id: string): Promise<PaymentsDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid payment ID.');

    const payment = await this.paymentModel
      .findById(id)

    if (!payment) throw new NotFoundException('No payment with given ID.');

    return payment;
  }
}
