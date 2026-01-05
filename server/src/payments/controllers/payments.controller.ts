import { Controller, Post } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(
        private paymentsService: PaymentsService,
    ) {}

    @Post()
    async createPayment(){
        return await this.paymentsService.create();
    }
}
