import { IsNotEmpty } from 'class-validator';

export class TaskRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
