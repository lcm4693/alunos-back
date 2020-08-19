import { RolesSystem } from './../../constants/roles-system';
import { User } from './../../domain/user.domain';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { Roles } from './../../roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('/login/authenticate')
  logar(@Request() req): User {
    const user = this.authService.login(req.user);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RolesSystem.ADMIN)
  @Get('/roles')
  getRoles() {
    return this.authService.getAll();
  }

}
