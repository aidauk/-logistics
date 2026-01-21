import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApplicationsService } from '../services/applications.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { ApplicationDto } from '../dto/application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}
  @UseGuards(AdminGuard)
  @Get()
  getApps() {
    return this.applicationsService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async getApp(@Param('id') id: string) {
    return await this.applicationsService.findById(id);
  }

  @Post()
  async createApp(@Body() credentials: ApplicationDto) {
    return await this.applicationsService.create({
      name: credentials.name,
      phone: credentials.phone,
      state: 'new',
      category: credentials.category,
      city: credentials.city,
    });
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteApp(@Param('id') id: string) {
    return await this.applicationsService.deleteOne(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async updateAppToAnswered(@Param('id') id: string) {
    console.log("hi there")
    return await this.applicationsService.updateToAnswered(id);
  }
}
