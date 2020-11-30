import { IsNotEmpty } from 'class-validator';

import { TaskStatus } from '../../graphql';

export class TaskRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  status: TaskStatus;
}
