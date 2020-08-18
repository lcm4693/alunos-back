import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req, res: Response, next: Function) {
      console.log('Teste de Middleware');
      await next();
  }
}
