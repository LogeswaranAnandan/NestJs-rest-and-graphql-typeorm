import { Injectable, NotFoundException } from '@nestjs/common';

import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { TaskRequestDto } from './dto/task-request.dto';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private _taskRepository: TaskRepository) {}

  async getAllTasks(currentuser: User): Promise<Task[]> {
    return await this._taskRepository.find({
      user: { id: currentuser.id },
    });
  }

  async getTaskById(id: number, currentUser: User): Promise<Task> {
    const task: Task = await this._taskRepository.findOne({
      id: id,
      user: { id: currentUser.id },
    });
    if (task) {
      return task;
    } else {
      throw new NotFoundException();
    }
  }

  async createTask(
    { title, description }: TaskRequestDto,
    user: User,
  ): Promise<Task> {
    console.log('user :: ', user);
    const task: Task = new Task(title, description);
    task.user.id = user.id;
    const createdTask: Task = await this._taskRepository.save(task);

    return createdTask;
  }

  async updateTask(
    id: number,
    { title, description, status }: Task,
    user: User,
  ): Promise<Task> {
    const existingTask: Task = await this.getTaskById(id, user);
    const task: Task = {
      ...existingTask,
      title,
      description,
      status,
    };

    const updatedTask: Task = await this._taskRepository.save(task);
    return updatedTask;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const existingTask: Task = await this.getTaskById(id, user);
    this._taskRepository.delete(existingTask.id);
  }
}
