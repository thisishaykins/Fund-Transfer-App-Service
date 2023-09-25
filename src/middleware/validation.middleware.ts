import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator'; // Import class-validator for validation

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const dto = req.body; // Assuming DTO is in the request body

    try {
      const errors = await validate(dto);
      if (errors.length > 0) {
        const validationErrors = errors.map((error) => Object.values(error.constraints));
        throw new HttpException({ message: 'Validation failed', errors: validationErrors }, HttpStatus.BAD_REQUEST);
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
