import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from '../models/task.model';
import { TaskRequestDto } from '../dto/task-request.dto';

@Injectable()
export class TasksService {
  tasks: Task[] = [
    {
      id: 1,
      title: 'test title',
      description: 'test description',
      status: TaskStatus.OPEN,
    },
  ];

  constructor() {}

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task {
    return this.tasks.find((task) => task.id == id);
  }

  createTask({ title, description }: TaskRequestDto): Task {
    const createdTask: Task = {
      id: this.tasks.length + 1,
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(createdTask);
    return createdTask;
  }

  updateTask(id: number, { title, description, status }: Task): Task {
    const task = this.getTaskById(id);
    task.title = title;
    task.description = description;
    task.status = status;

    return task;
  }

  deleteTask(id: number): void {
    const index: number = this.tasks.findIndex((task) => task.id == id);
    if (index != -1) {
      this.tasks.splice(index, 1);
    }
  }
}
