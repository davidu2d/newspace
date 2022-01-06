import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ){}

  async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.getUser(username);
      if (user && bcrypt.compareSync(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
  }

  async getAccessToken(user: any) {
    const userAuth = await this.getUser(user.username);
    const payload = { username: userAuth.username, sub: userAuth.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async decodeUsernameAndPassword(headerBasicEncode: string) {
    const userEncode = headerBasicEncode.split(" ");
    const userDecode = userEncode[1];
    let user = {}
    if (userDecode) {
      const temp = atob(userDecode).split(':');
      user = {username: temp[0], password: temp[1]}
    }
    return user;
  }

  async getUser(username: string) {
    return this.userService.findOneByUsername(username);
  }
}
