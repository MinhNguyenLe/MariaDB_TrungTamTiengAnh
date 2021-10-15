import { Controller, Get, Header, Post, UseGuards,Request } from '@nestjs/common';
import { log } from 'console';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

// @Controller('api')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private authService: AuthService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): { name: string } {
    return { name: 'Duong' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    log("getProfile " + JSON.stringify(req.user));
    return req.user;
  }
}
