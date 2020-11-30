import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { TaskStatusValidationPipe } from '../pipes/task-status.pipe';
import { TaskRequestDto } from './dto/task-request.dto';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@Resolver('Tasks')
export class TasksResolver {
  constructor(private _tasksService: TasksService) {}
  @Query('tasks')
  async getAllTasks(@CurrentUser() currentUser: User): Promise<Task[]> {
    return await this._tasksService.getAllTasks(currentUser);
  }

  @Query('task')
  async getTaskById(
    @Args('id') id: number,
    @CurrentUser() currentUser: User,
  ): Promise<Task> {
    return await this._tasksService.getTaskById(id, currentUser);
  }

  @Mutation('createTask')
  async createTask(
    @Args('taskRequestDto') taskRequestDto: TaskRequestDto,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return await this._tasksService.createTask(taskRequestDto, user);
  }

  @Mutation('updateTask')
  async updateTask(
    @Args('id') id: number,
    @Args('taskRequestDto', TaskStatusValidationPipe)
    taskRequestDto: TaskRequestDto,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return await this._tasksService.updateTask(id, taskRequestDto, user);
  }

  @Mutation('deleteTask')
  async deleteTask(
    @Args('id') id: number,
    @CurrentUser() user: User,
  ): Promise<number> {
    return await this._tasksService.deleteTask(id, user);
  }
}
