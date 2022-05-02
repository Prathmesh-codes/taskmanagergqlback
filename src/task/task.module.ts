import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  // use typeorm to create the table Task using repository
  imports: [TypeOrmModule.forFeature([TaskRepository]), UserModule],

  controllers: [],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
