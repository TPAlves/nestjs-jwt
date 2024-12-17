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
} from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  createTask(@Body() task: TaskDto) {
    this.taskService.createTask(task);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): TaskDto {
    return this.taskService.getTaskById(id);
  }

  @Get()
  getAllTasks(@Query() params: FindAllParameters): TaskDto[] {
    return this.taskService.getAllTasks(params);
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() task: TaskDto) {
    return this.taskService.updateTask(id, task);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): string {
    return this.taskService.deleteTask(id);
  }
}
