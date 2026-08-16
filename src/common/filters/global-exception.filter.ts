import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong, please try again later';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || message;
    }

    else if ((exception as any)?.code === 11000) {
      status = HttpStatus.CONFLICT;
      const field = Object.keys((exception as any).keyPattern || {})[0];
      message = field
        ? `${field} already exists`
        : 'Duplicate value, this record already exists';
    }
    else if ((exception as any)?.name === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;
      message = Object.values((exception as any).errors)
        .map((err: any) => err.message)
        .join(', ');
    }
    else {
      console.error('Unhandled Exception:', exception);
    }

    response.status(status).json({
      message,
      success: false,
      data: null,
    });
  }
}