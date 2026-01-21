import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { connectDB } from '../utils/config';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from 'src/users/users.module';
import { CommandModule } from 'nestjs-command';
import { OrderModule } from '../orders/order.module';
// import { SeedsModule } from '../seeds/seeds.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PaymentsModule } from 'src/payments/payments.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { CurrencyModule } from 'src/currency/currency.module';
import { CronModule } from 'src/cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SeoModule } from 'src/seo/seo.module';
import { NewsModule } from 'src/news/news.module';
import { ApplicationsModule } from 'src/applications/applications.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: connectDB,
    }),
    MulterModule.register({
      dest: './public'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), './public'),
    }),
    ProductsModule,
    UsersModule,
    OrderModule,
    PaymentsModule,
    CommandModule,
    CategoriesModule,
    CurrencyModule,
    CronModule,
    SeoModule,
    NewsModule,
    ApplicationsModule,
    // SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
