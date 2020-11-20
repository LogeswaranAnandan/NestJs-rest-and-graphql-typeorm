import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { Task } from '../entities/task.entity';
import { TaskRequestDto } from './dto/task-request.dto';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    return await this.taskRepository.findOne(id);
  }

  async createTask({ title, description }: TaskRequestDto): Promise<Task> {
    const task: Task = new Task(title, description);
    const createdTask: Task = await this.taskRepository.save(task);

    return createdTask;
  }

  async updateTask(
    id: number,
    { title, description, status }: Task,
  ): Promise<Task> {
    const existingTask: Task = await this.getTaskById(id);
    const task: Task = {
      ...existingTask,
      title,
      description,
      status,
    };

    const updatedTask: Task = await this.taskRepository.save(task);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    const deleteResult: DeleteResult = await this.taskRepository.delete(id);
    console.log('delete Result :: ', deleteResult);
  }
}
