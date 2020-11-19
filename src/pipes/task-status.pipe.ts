import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from 'src/models/task-status.enum';

import { Task } from '../entities/task.entity';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  readonly acceptableStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(task: Task) {
    const { status } = task;

    if (this.acceptableStatuses.find((s) => s == status)) {
      return task;
    } else {
      throw new BadRequestException();
    }
  }
}
