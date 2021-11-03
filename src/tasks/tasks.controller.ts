import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { ValidateTaskStatusDto } from './dto/validate-task-status.dto';
import { Tasks, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterTaskDto: FilterTaskDto): Tasks[] {
    if(Object.keys(filterTaskDto).length){
      return this.tasksService.getFilterTasks(filterTaskDto);
    }else{
      return this.tasksService.getAllTasks();
    }
  }

  @Get(':uuid')
  getTaskById(@Param() params): Tasks {
    return this.tasksService.getTaskById(params.uuid);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Tasks {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':uuid')
  deleteTask(@Param('uuid') uuid): void {
    return this.tasksService.deleteTaskById(uuid);
  }

  @Patch('/:uuid/status')
  updateTaskStatus(
    @Param('uuid') uuid,
    @Body() validateTaskStatusDto: ValidateTaskStatusDto,
  ): Tasks {
    const { status } = validateTaskStatusDto;
    return this.tasksService.updateTaskStatus(uuid, status);
  }
}
