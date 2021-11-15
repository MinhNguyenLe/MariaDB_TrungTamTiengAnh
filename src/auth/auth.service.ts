import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(userName);
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log('compare: ' + isMatch);
    if (user && isMatch) {
      const { password, ...result } = user;
      log('validateUser: ' + JSON.stringify(result));
      return result;
    }
    throw new NotFoundException('Authentication failed!');
  }

  async login(user: any) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
