import { TaskService } from './task.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  async createTask(@Body() task: TaskDto) {
    return await this.taskService.createTask(task);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.getTaskById(id);
  }

  @Get()
  async getAllTasks(@Query() params: FindAllParameters): Promise<TaskDto[]> {
    return await this.taskService.getAllTasks(params);
  }

  @Put('/:id')
  async updateTask(@Param('id') id: string, @Body() task: Partial<TaskDto>) {
    return await this.taskService.updateTask(id, task);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<string> {
    return await this.taskService.deleteTask(id);
  }
}
