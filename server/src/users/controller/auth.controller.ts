import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProfileDto } from '../dtos/profile.dto';
import { RegisterDto } from '../dtos/register.dto';
import { UserDto } from '../dtos/user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument, @Session() session: any) {
    const {
      name,
      _id,
      email,
      isAdmin,
      favorites,
      gender,
      phone,
      address,
      products,
    } = user;

    const { accessToken } = await this.authService.login(email, _id);

    const loggedUser = {
      name,
      _id,
      isAdmin,
      email,
      favorites,
      products,
      accessToken,
      gender,
      phone,
      address,
    };

    session.user = loggedUser;

    return loggedUser;
  }
  @UseGuards(LocalAuthGuard)
  @Post('admin/login')
  async Adminlogin(@CurrentUser() user: UserDocument, @Session() session: any) {
    const {
      name,
      _id,
      email,
      isAdmin,
      favorites,
      gender,
      phone,
      address,
      products,
    } = user;

    if (!isAdmin) throw new BadRequestException('You are not admin!');

    const { accessToken } = await this.authService.login(email, _id);

    const loggedUser = {
      name,
      _id,
      isAdmin,
      email,
      favorites,
      products,
      accessToken,
      gender,
      phone,
      address,
    };

    session.user = loggedUser;

    return loggedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Session() session: any) {
    return session.user;
  }

  @Post('logout')
  async logout(@Session() session: any) {
    console.log('logging out');
    session.user = null;
  }

  @Post('register')
  async register(
    @Body() { name, email, password }: RegisterDto,
    @Session() session: any,
  ) {
    const user = await this.authService.register(name, email, password);

    const { _id, isAdmin, favorites, phone, address, gender } = user;

    const { accessToken } = await this.authService.login(email, user._id);

    const loggedUser = {
      name,
      _id,
      isAdmin,
      email,
      favorites,
      accessToken,
      phone,
      gender,
      address,
    };

    session.user = loggedUser;

    return loggedUser;
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async updateUser(@Body() credentials: ProfileDto, @Session() session: any) {
    const updatedUser = await this.usersService.update(
      session.user._id,
      credentials,
    );
    session.user = updatedUser;
    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Put('favorites')
  async addToFavorites(
    @Body() body: { productId: string },
    @Session() session: any,
  ) {
    console.log('adding to favorites');
    const updatedUser = await this.usersService.addToFavorites(
      session.user._id,
      body.productId,
    );
    session.user = updatedUser;
    return updatedUser;
  }
}
