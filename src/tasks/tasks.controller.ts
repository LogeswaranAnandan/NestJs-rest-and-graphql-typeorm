import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Task } from '../entities/task.entity';
import { TaskStatusValidationPipe } from '../pipes/task-status.pipe';
import { TaskRequestDto } from './dto/task-request.dto';
import { TasksService } from './tasks.service';

// @UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() task: TaskRequestDto): Promise<Task> {
    return await this.tasksService.createTask(task);
  }

  @Put('/:id')
  async updateTask(
    @Param('id') id: number,
    @Body(TaskStatusValidationPipe) task: Task,
  ): Promise<Task> {
    return await this.tasksService.updateTask(id, task);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return await this.tasksService.deleteTask(id);
  }
}
