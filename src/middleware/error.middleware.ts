import { Injectable, NestMiddleware, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Error handling logic here
    next(new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR));
  }
}
