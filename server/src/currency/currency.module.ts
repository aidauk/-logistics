import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency, CurrencySchema } from './schemas/currency.schema';
import { CurrencyService } from './services/currency.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Currency.name,
        schema: CurrencySchema,
      },
    ]),
  ],
  providers: [CurrencyService],
  controllers: [],  
  exports: [CurrencyService],
})
export class CurrencyModule {}
