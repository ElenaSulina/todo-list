import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/role-auth.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}


    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.addUser(userDto);
    }


    @ApiOperation({ summary: 'Получение списка пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get() 
    listOfUsers() {
        return this.usersService.getUsers();
    }


    @ApiOperation({ summary: 'Получение пользователя' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(JwtAuthGuard)
    @Get("/:id") 
    getUser(@Req() req, @Param("id") id: number) {
        console.log(req)
        return this.usersService.getUserById(req.user, id);
    }


    @ApiOperation({ summary: 'Изменение пользователя' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(JwtAuthGuard)
    @Put("/:id") 
    updateUser(@Req() req, @Param("id") id: number, @Body() dto: CreateUserDto) {
        return this.usersService.updateUser(req.user, id, dto);
    }


    @ApiOperation({ summary: 'Присвоение ролей пользователю (доступ: ADMIN)' })
    @ApiResponse({ status: 200, type: User })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/role") 
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }


    @ApiOperation({ summary: 'Удаление пользователя' })
    @ApiResponse({ status: 204 })
    @UseGuards(JwtAuthGuard)
    @Delete("/:id") 
    deleteUser(@Req() req, @Param("id") id: number) {
        return this.usersService.deleteUser(req.user, id);
    }
}
