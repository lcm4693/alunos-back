import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { AuthService } from './../auth/auth.service';
import { LocalAuthGuard } from './../auth/local-auth.guard';
import { User } from './../domain/user.domain';
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/authenticate')
  criar(@Request() req): Promise<User> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
