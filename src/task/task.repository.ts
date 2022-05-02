import { UserEntity } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create.task.dto';
import { SearchTaskDTO } from './dto/search.task.dto';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task.enum';
import { TaskInputType } from './types/task.input';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async getTasks(user: UserEntity, status: string) {
    // create a query builder
    const query = this.createQueryBuilder('task');

    // search by status
    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }

    // add the user id
    query.andWhere(`task.userId = :userId`, { userId: user.id });

    // execute the query to get many records
    return await query.getMany();
  }

  // updateTask() {}

  async createTask(input: TaskInputType, user: UserEntity) {
    // create a row in the Task Table (TaskEntity)
    const task = new TaskEntity();
    task.title = input.title;
    task.description = input.description;
    task.status = TaskStatus.OPEN;

    // the logged in user will own the task
    task.user = user;

    // create a new row in the Task Table
    await task.save();

    // delete user property
    delete task.user;

    return task;
  }
}
