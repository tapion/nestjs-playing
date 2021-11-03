import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getAllTasks(): Tasks[] {
    return this.tasks;
  }

  getFilterTasks(filterTaskDto: FilterTaskDto): Tasks[] {
    const tasks = this.getAllTasks();
    if (filterTaskDto.status) {
      return tasks.filter((task) => task.status === filterTaskDto.status);
    } else if (filterTaskDto.search) {
      return tasks.filter((task) => {
        if (
          task.title.includes(filterTaskDto.search) ||
          task.description.includes(filterTaskDto.search)
        )
          return true;
        else return false;
      });
    }
  }

  getTaskById(taskId: string): Tasks {
    const found = this.tasks.find((task) => task.id === taskId);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Tasks {
    const { title, description } = createTaskDto;
    const task: Tasks = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTaskById(uuid: string): void {
    this.getTaskById(uuid);
    this.tasks = this.tasks.filter((task) => task.id !== uuid);
  }

  updateTaskStatus(uuid: string, status: TaskStatus): Tasks {
    this.tasks = this.tasks.map((task) => {
      if (task.id === uuid) {
        task.status = status;
      }
      return task;
    });
    return this.getTaskById(uuid);
  }
}
