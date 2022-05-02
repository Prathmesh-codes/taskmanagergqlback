import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CreateTaskDTO } from './dto/create.task.dto';
import { SearchTaskDTO } from './dto/search.task.dto';
import { TaskStatus } from './task.enum';
import { TaskRepository } from './task.repository';
import { TaskInputType } from './types/task.input';

@Injectable()
export class TaskService {
  constructor(
    // add the dependency for TaskRepository
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // return tasks
  async getTasks(user: UserEntity, status: string) {
    return this.taskRepository.getTasks(user, status);
  }

  // create a new task
  async createTask(input: TaskInputType, user: UserEntity) {
    // get a new row created for the task
    return this.taskRepository.createTask(input, user);
  }

  async getTaskById(id: number) {
    // select * from Task where id = {id}
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('task not found');
    }

    return task;
  }

  async updateTaskStatus(id: number, status: TaskStatus) {
    // find the task by id
    const task = await this.getTaskById(id);

    // update the status
    task.status = status;

    // save the changes
    await task.save();

    return task;
  }

  async deleteTask(id: string) {
    // try deleting the task with id
    const result = await this.taskRepository.delete(id);

    // if affected rows are > 0 -> success
    if (result.affected == 0) {
      throw new NotFoundException('task not found');
    }

    return result;
  }
}
