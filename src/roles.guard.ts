import { User } from './domain/user.domain';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector){

    }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      console.log('Chamou o RolesGuard');
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user: User = request.user;

      return this.matchRoles(roles, user.roles);
  }

  private matchRoles(rolesMethod: string[], rolesUser: string[]){
    for(const roleMethod of rolesMethod){
      if(rolesUser.includes(roleMethod)){
        return true;    
      }
    }
  }
}