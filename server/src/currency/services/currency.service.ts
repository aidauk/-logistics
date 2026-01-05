import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency, CurrencyDocument } from '../schemas/currency.schema';
import { TCurrency } from 'src/common/types';
import { getCurrentDateYYYY_MM_DD } from 'src/common/utilities/date';
import { ECurrency } from 'src/common/constants';
import axios, { AxiosRequestConfig } from 'axios';
import * as https from 'https';

@Injectable()
export class CurrencyService {
  private logger = new Logger(CurrencyService.name);

  private readonly endpoint = 'https://cbu.uz/uz/arkhiv-kursov-valyut/json/';
  private readonly DateFormat = 'YYYY-MM-DD';

  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
  ) {}

  async mockCreate() {
    const currency = new Currency();
    currency.name = ECurrency.USD;
    currency.isoCode = 840;
    currency.baseRate = 0;
    currency.createdAt = new Date();
    this.currencyModel.create(currency);
    this.logger.log(currency);

    const currencyRub = new Currency();
    currencyRub.name = ECurrency.RUB;
    currencyRub.isoCode = 643;
    currencyRub.baseRate = 0;
    currencyRub.createdAt = new Date();
    this.currencyModel.create(currencyRub);
    this.logger.log(currencyRub);
  }

  async convert(
    from: TCurrency,
    to: TCurrency,
    amount: number,
  ): Promise<number> {
    if (from == to) {
      return amount;
    } else if (from == ECurrency.UZS) {
      const toCurrency = await this.currencyModel.findOne({ name: to });
      return Number(Number(amount / toCurrency.baseRate).toFixed(2));
    } else if (to == ECurrency.UZS) {
      const fromCurrency = await this.currencyModel.findOne({ name: from });
      return Number(Number(amount * fromCurrency.baseRate).toFixed(2));
    } else {
      const toCurrency = await this.currencyModel.findOne({ name: to });
      const fromCurrency = await this.currencyModel.findOne({ name: from });

      return Number(
        Number((amount * toCurrency.baseRate) / fromCurrency.baseRate).toFixed(
          2,
        ),
      );
    }
  }

  async updateCurrencyRatesFromCBU() {
    const date = getCurrentDateYYYY_MM_DD();
    const currencysISO = [
      { currency: ECurrency.USD },
      { currency: ECurrency.RUB },
    ]; // currencys that will be updated

    for (const currency of currencysISO) {
      try {
        const endpoint = this.endpoint + currency.currency + '/' + date + '/';
        const axiosConfig = this.prepareAxiosConfig(
          'get',
          endpoint,
          null,
          'cbu.uz',
        );
        const response = await axios(axiosConfig);
        const result = response.data[0];
        this.logger.debug(
          `${this.updateCurrencyRatesFromCBU.name} - result: `,
          result,
        );
        const baseRate =
          Number(
            Number(Math.ceil(Math.abs(result['Rate'])) / 10)
              .toFixed(0)
              .valueOf(),
          ) * 10;
        await this.currencyModel.updateOne(
          { name: result['Ccy'] },
          {
            $set: {
              updatedAt: new Date(),
              baseRate: baseRate,
            },
          },
        );
      } catch (error) {
        this.logger.error(
          `${this.updateCurrencyRatesFromCBU.name} - err: `,
          error,
        );
      }
    }
  }

  prepareAxiosConfig(
    method: 'get' | 'post',
    endpoint: string,
    params: any,
    host: string,
  ): AxiosRequestConfig {
    return <AxiosRequestConfig>{
      method,
      url: endpoint,
      timeout: 60 * 1000, // wait for 60 sec than throw error
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      headers: {
        Host: host,
        'Content-Type': 'application/json',
      },
      data: params,
    };
  }
}
