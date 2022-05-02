import {} from 'class-validator';
import { TaskStatus } from '../task.enum';

// this is data transfer object
// which is used to transfer data from one to another entity
export class SearchTaskDTO {
  search: string;
  status: TaskStatus;
}
