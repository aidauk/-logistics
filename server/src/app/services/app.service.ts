import { BadRequestException, Injectable } from '@nestjs/common';
import { Image } from 'src/interfaces';
import { ProductsService } from 'src/products/services/products.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AppService {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

}
