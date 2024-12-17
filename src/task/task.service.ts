import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  createTask(task: TaskDto) {
    this.tasks.push(task);
  }

  getTaskById(id: string): TaskDto {
    const existsTask = this.tasks.filter((task) => task.id === id);
    if (existsTask.length) {
      return existsTask[0];
    }
    this.notFoundExceptionCustomer(id);
  }

  getAllTasks(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter((t) => {
      let status = true;
      if (
        params.title != undefined &&
        !t.title.toLowerCase().includes(params.title.toLowerCase())
      ) {
        status = false;
      }

      if (
        params.status != undefined &&
        !t.status.toLowerCase().includes(params.status.toLowerCase())
      ) {
        status = false;
      }
      return status;
    });
  }

  updateTask(id: string, task: TaskDto) {
    this.getTaskById(id);
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    this.tasks[taskIndex] = task;
    return this.tasks[taskIndex];
  }

  deleteTask(id: string): string {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return `Task ${id} apagada com sucesso!`;
    }
    this.notFoundExceptionCustomer(id);
  }

  notFoundExceptionCustomer(id: string): void {
    throw new HttpException(
      `Task inexistente com o id ${id}`,
      HttpStatus.NOT_FOUND,
    );
  }
}
