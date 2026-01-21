import { Module } from '@nestjs/common';
import { CurrencyCron } from './currency.cron';
import { CurrencyModule } from 'src/currency/currency.module';

@Module({
    imports: [CurrencyModule],
    providers: [CurrencyCron],
    exports: [
        CurrencyCron,
    ],
})
export class CronModule {}
