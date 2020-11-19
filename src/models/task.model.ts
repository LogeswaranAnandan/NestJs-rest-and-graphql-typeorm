import { UsePipes } from '@nestjs/common';
import { TaskStatusValidationPipe } from '../pipes/task-status.pipe';

export class Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}
