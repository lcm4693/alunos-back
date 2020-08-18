import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { strict } from 'assert';
import { STATUS_CODES } from 'http';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    //As rotas que não devem ser logadas
    if(this.excludeRoutes().includes(context.switchToHttp().getRequest().url)){
      return next.handle();
    }

    const start = new Date();
    return next.handle().pipe(
      map((result) => {
        const resp = context.switchToHttp().getResponse();
        const req = context.switchToHttp().getRequest();
        this.logarTempoRequest(req, resp, start);
        return result;
      }),
      catchError((error) => {
        const req = context.switchToHttp().getRequest();
        this.logarTempoRequest(req, error.response, start);
        return throwError(error);
      }),
    );
  }

  private excludeRoutes(){
    const rotasExcluidas = ['/users', '/users/'];
    return rotasExcluidas;
  }

  private logarTempoRequest(request: any, response: any, start: Date) {
    const time =
      start.getDate() +
      '/' +
      (start.getMonth() + 1) +
      '/' +
      start.getFullYear() +
      ' ' +
      start.getHours() +
      ':' +
      start.getMinutes() +
      ':' +
      start.getSeconds();
    console.log(
      `Serviço ${request.url} - Started ${time} - Status: ${
        response ? response.statusCode : HttpStatus.INTERNAL_SERVER_ERROR
      } - Finalizado em: ${new Date().getTime() - start.getTime()}ms`,
    );
  }
}
