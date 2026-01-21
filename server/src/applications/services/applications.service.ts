import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Application,
  ApplicationDocument,
} from '../schemas/applications.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private applicationsModel: Model<ApplicationDocument>,
  ) {}

  async create(
    details: Partial<ApplicationDocument>,
  ): Promise<ApplicationDocument> {
    const createdApp = await this.applicationsModel.create(details);

    return createdApp;
  }

  async findById(id: string): Promise<ApplicationDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid application ID.');

    const application = await this.applicationsModel.findById(id);

    if (!application) throw new NotFoundException('Application not found.');

    return application;
  }

  async findAll(): Promise<ApplicationDocument[]> {
    const applications = await this.applicationsModel.find();

    return applications;
  }

  async deleteOne(id: string): Promise<void> {
    const application = await this.findById(id);

    await application.deleteOne();
  }

  async updateToAnswered(
    id: string,
  ): Promise<ApplicationDocument> {
    const application = await this.findById(id);

    application.state = 'answered';

    const updatedApp = await application.save();

    return updatedApp;
  }
}
