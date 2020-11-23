import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Logger,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { TaskStatusValidationPipe } from '../pipes/task-status.pipe';
import { TaskRequestDto } from './dto/task-request.dto';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  private _logger: LoggerService = new Logger(TasksController.name);
  constructor(private _tasksService: TasksService) {}

  @Get()
  async getAllTasks(@CurrentUser() currentUser: User): Promise<Task[]> {
    this._logger.debug(
      `Entering :: getAllTasks :: ${JSON.stringify(currentUser)}`,
    );
    const tasks: Task[] = await this._tasksService.getAllTasks(currentUser);
    this._logger.debug(`Exiting :: getAllTasks :: ${JSON.stringify(tasks)}`);
    return tasks;
  }

  @Get('/:id')
  async getTaskById(
    @Param('id') id: number,
    @CurrentUser() currentUser: User,
  ): Promise<Task> {
    return await this._tasksService.getTaskById(id, currentUser);
  }

  @Post()
  async createTask(
    @Body() taskRequestDto: TaskRequestDto,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return await this._tasksService.createTask(taskRequestDto, user);
  }

  @Put('/:id')
  async updateTask(
    @Param('id') id: number,
    @Body(TaskStatusValidationPipe) task: Task,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return await this._tasksService.updateTask(id, task, user);
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<void> {
    return await this._tasksService.deleteTask(id, user);
  }
}
