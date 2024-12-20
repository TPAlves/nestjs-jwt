import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeSeconds: number;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async login(username: string, password: string): Promise<AuthResponseDto> {
    const existsUser = await this.userService.findByUserName(username);
    if (!existsUser || !compareSync(password, existsUser.password)) {
      throw new UnauthorizedException('Dados inválidos');
    }
    const payload = { sub: existsUser.id, username: username };
    const token = this.jwtService.sign(payload);
    return { token, expiresIn: this.jwtExpirationTimeSeconds };
  }
}
