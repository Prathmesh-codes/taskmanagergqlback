import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as crypto from 'crypto-js';
import { TaskEntity } from 'src/task/task.entity';

@Entity('User')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // one user may have multiple tasks
  @OneToMany((type) => TaskEntity, (task) => task.user, { eager: true })
  tasks: TaskEntity[];

  validatePassword(password: string) {
    const encrypted = `${crypto.MD5(password)}`;
    console.log(`encrypted: ${encrypted}, user: ${this.password}`);
    return encrypted == this.password;
  }
}
