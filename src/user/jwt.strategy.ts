import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt.payload';
import { UserRepository } from './user.repository';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    // get the token from incoming request and
    // validate it using secret
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });

    console.log('inside JwtStrategy');
  }

  async validate(payload: JwtPayload) {
    // get the user id or username from the payload
    const user = this.userRepository.findOne({ id: payload.id });

    // if user does not exist throw 401
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
