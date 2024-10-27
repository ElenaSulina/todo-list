import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.entity';
import { Roles } from 'src/guards/role-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Роли")
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService){}

    @ApiOperation({ summary: 'Создание роли' })
    @ApiResponse({ status: 200, type: Role })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: createRoleDto){
        return this.roleService.createRole(dto);
    }

    @ApiOperation({ summary: 'Получение роли по названию' })
    @ApiResponse({ status: 200, type: Role })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/:value")
    getByValue(@Param("value") value: string){
        return this.roleService.getRoleByValue(value.toUpperCase());
    }

    @ApiOperation({ summary: 'Удаление роли' })
    @ApiResponse({ status: 204 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete("/:id")
    delete(@Param("id") id: number){
        return this.roleService.deleteRole(id);
    }
}
