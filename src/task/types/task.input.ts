import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskInputType {
  @Field()
  title: string;

  @Field()
  description: string;
}
