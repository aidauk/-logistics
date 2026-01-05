import { Injectable } from '@nestjs/common';
import { ErrorMessages, RestError } from './error';

@Injectable()
export class ErrorService {
  interlanError(data: string) {
    return new RestError(
      ErrorMessages.InternalError.code,
      ErrorMessages.InternalError.message,
      data,
    );
  }
}
