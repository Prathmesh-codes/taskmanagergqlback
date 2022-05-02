import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GQLAuthGuard } from './gql.authguard';
import { JwtStrategy } from './jwt.strategy';
import { UserInput } from './types/user.input';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    // for JWT
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),

    // for passport authentication and authorization
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    // for TypeORM dependency
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [],
  providers: [UserService, JwtStrategy, UserResolver, UserInput, GQLAuthGuard],

  // to use these providers in the TaskModule
  exports: [JwtStrategy, PassportModule, GQLAuthGuard],
})
export class UserModule {}
