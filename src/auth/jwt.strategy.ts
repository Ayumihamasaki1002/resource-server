import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('SECRET'), // 假设SECRET是一个字符串
    });
  }

  async validate(payload: any) {
    // payload通常是JWT中的有效载荷，而不是User实体
    // 你可能需要根据有效载荷的内容来获取用户
    const userId = payload.sub; // 假设sub字段存储了用户的ID
    const existUser = await this.authService.getUser(userId);
    if (!existUser) {
      throw new UnauthorizedException('token不正确');
    }

    return existUser;
  }
}
