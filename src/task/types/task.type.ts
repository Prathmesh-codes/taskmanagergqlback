import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Task')
export class TaskType {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: string;
}
