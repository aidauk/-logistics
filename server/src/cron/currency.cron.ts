import { Injectable, Logger } from '@nestjs/common';
import { CurrencyService } from 'src/currency/services/currency.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CurrencyCron {
  private logger = new Logger(CurrencyCron.name);

  constructor(private currencyService: CurrencyService) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async updateCurrencyRatesFromCBU() {
    this.currencyService.updateCurrencyRatesFromCBU();
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async once() {
  //   this.currencyService.mockCreate();
  // }
}
