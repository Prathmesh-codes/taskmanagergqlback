import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';

@ObjectType()
export class SigninResponse {
  @Field()
  token: string;

  // @Field()
  // user: UserType;
}
