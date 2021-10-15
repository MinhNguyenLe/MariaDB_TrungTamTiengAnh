import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      log("validateUser: " + JSON.stringify(result));
      return result;
    }
    throw new NotFoundException('Authentication failed!');
  }

  async login(user: any) {
    const payload = {user};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}