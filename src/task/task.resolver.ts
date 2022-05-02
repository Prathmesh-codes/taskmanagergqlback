import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/user/get.user.decorator';
import { GQLAuthGuard } from 'src/user/gql.authguard';
import { UserEntity } from 'src/user/user.entity';
import { TaskStatus } from './task.enum';
import { TaskService } from './task.service';
import { TaskInputType } from './types/task.input';
import { TaskType } from './types/task.type';

@Resolver((of) => TaskType)
@UseGuards(GQLAuthGuard)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query((returns) => [TaskType])
  tasks(@Args('status') status: string, @GetUser() user: UserEntity) {
    return this.taskService.getTasks(user, status);
  }

  @Mutation((returns) => TaskType)
  createTask(@Args('input') input: TaskInputType, @GetUser() user: UserEntity) {
    return this.taskService.createTask(input, user);
  }

  @Mutation((returns) => TaskType)
  updateTaskStatus(
    @Args('id') id: number,
    @Args('status') status: string,
    @GetUser() user: UserEntity,
  ) {
    let taskStatus: TaskStatus;
    if (status == 'OPEN') {
      taskStatus = TaskStatus.OPEN;
    } else if (status == 'IN_PROGRESS') {
      taskStatus = TaskStatus.IN_PROGRESS;
    } else if (status == 'DONE') {
      taskStatus = TaskStatus.DONE;
    }

    return this.taskService.updateTaskStatus(id, taskStatus);
  }
}
