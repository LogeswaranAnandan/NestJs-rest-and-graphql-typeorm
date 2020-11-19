import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { TaskRequestDto } from '../dto/task-request.dto';
import { Task } from '../models/task.model';
import { TaskStatusValidationPipe } from '../pipes/task-status.pipe';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: TaskRequestDto): Task {
    return this.tasksService.createTask(task);
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: number,
    @Body(TaskStatusValidationPipe) task: Task,
  ): Task {
    return this.tasksService.updateTask(id, task);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
