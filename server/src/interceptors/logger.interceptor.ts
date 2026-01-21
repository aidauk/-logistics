import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body, headers } = req;
    const now = Date.now();

    // this.logger.log({
    //   GlobalInterceptor: 'request',
    //   originalUrl,
    //   method,
    //   params,
    //   query,
    //   body,
    //   headers,
    // });

    return next.handle().pipe(
      tap((data) =>
        this.logger.log({
          GlobalInterceptor: 'response',
          statusCode,
          data,
          time: `After... ${Date.now() - now}ms`,
        }),
      ),
    );
  }
}
