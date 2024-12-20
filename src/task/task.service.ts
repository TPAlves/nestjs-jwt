import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { FindOptionsWhere, Repository, Like } from 'typeorm';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(task: TaskDto) {
    const taskToSave: TaskEntity = {
      title: task.title,
      description: task.description,
      status: TaskStatusEnum.TODO,
      updatedDate: new Date(),
      expirationDate: task.expirationDate,
    };
    const createdTask = await this.taskRepository.save(taskToSave);
    return this.mapEntityToDto(createdTask);
  }

  async getTaskById(id: string): Promise<TaskDto> {
    this.validateId(id);
    const existsTask = await this.taskRepository.findOne({ where: { id } });
    if (!existsTask) {
      this.notFoundExceptionCustomer(id);
    }
    return this.mapEntityToDto(existsTask);
  }

  async getAllTasks(params: FindAllParameters): Promise<TaskDto[]> {
    const searchParams: FindOptionsWhere<TaskEntity> = {};
    if (params.title) {
      searchParams.title = Like(`%${params.title}%`);
    }
    if (params.status) {
      searchParams.status = Like(`%${params.status}%`);
    }

    const tasksFound = await this.taskRepository.find({
      where: searchParams,
    });
    return tasksFound.map((task) => this.mapEntityToDto(task));
  }

  async updateTask(id: string, task: Partial<TaskDto>) {
    await this.getTaskById(id);
    task.updatedDate = new Date();
    await this.taskRepository.update(id, this.mapDtoToEntity(task));
    return {
      status: `Task ${id} atualizada com sucesso!`,
      data: await this.getTaskById(id),
    };
  }

  async deleteTask(id: string): Promise<string> {
    await this.getTaskById(id);
    await this.taskRepository.delete(id);
    return `Task ${id} deletada com sucesso!`;
  }

  notFoundExceptionCustomer(id: string) {
    throw new HttpException(
      `Task inexistente com o id ${id}`,
      HttpStatus.NOT_FOUND,
    );
  }
  private mapEntityToDto(taskEntity: TaskEntity): TaskDto {
    return {
      id: taskEntity.id,
      title: taskEntity.title,
      description: taskEntity.description,
      status: taskEntity.status,
      updatedDate: taskEntity.updatedDate,
      expirationDate: taskEntity.expirationDate,
    };
  }
  private mapDtoToEntity(taskDto: Partial<TaskDto>): Partial<TaskEntity> {
    return {
      title: taskDto.title,
      description: taskDto.description,
      status: taskDto.status,
      updatedDate: taskDto.updatedDate,
      expirationDate: taskDto.expirationDate,
    };
  }
  private validateId(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Id inválido');
    }
  }
}
