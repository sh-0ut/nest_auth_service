import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req: Request) {
    return this.authService.login(req.body);
  }

  @Post('register')
  async register(@Body() userDto: { [key: string]:string}) {
    return this.authService.register(userDto);
  }
}
