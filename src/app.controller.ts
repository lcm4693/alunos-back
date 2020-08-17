import { User } from './domain/user.domain';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login/authenticate')
  logar(@Request() req): User {
    const user = this.authService.login(req.user);
    return user;
  }

}
