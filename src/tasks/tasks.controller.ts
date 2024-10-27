import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { moveTaskDto } from './dto/move-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './tasks.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("Задачи")
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}


    @ApiOperation({ summary: 'Создание задачи' })
    @ApiResponse({ status: 200, type: Task })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req, @Body() dto: createTaskDto){
        return this.tasksService.createTask(req.user, dto);
    }


    @ApiOperation({ summary: 'Получение задачи по id' })
    @ApiResponse({ status: 200, type: Task })
    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    open(@Req() req, @Param("id") id: number) {
        return this.tasksService.getTaskById(req.user, id)
    }


    @ApiOperation({ summary: 'Изменение задачи' })
    @ApiResponse({ status: 200, type: Task })
    @UseGuards(JwtAuthGuard)
    @Put("/:id") 
    updateTask(@Req() req, @Param("id") id: number, @Body() dto: createTaskDto) {
        return this.tasksService.updateTask(req.user, id, dto);
    }


    @ApiOperation({ summary: 'Изменение списка задач для данной задачи (перетаскивание) и порядкового номера задачи в списке задач' })
    @ApiResponse({ status: 200, type: Task })
    @UseGuards(JwtAuthGuard)
    @Post("/:id/move")
    move(@Req() req, @Param("id") id: number, @Body() dto: moveTaskDto){
        return this.tasksService.moveTask(req.user, id, dto);
    }


    @ApiOperation({ summary: 'Удаление задачи' })
    @ApiResponse({ status: 204 })
    @UseGuards(JwtAuthGuard)
    @Delete("/:id") 
    deleteTask(@Req() req, @Param("id") id: number) {
        return this.tasksService.deleteTask(req.user, id);
    }
}
