import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import * as bcrypt from "bcryptjs"

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private roleService: RolesService
    ) {}


    async addUser(dto: CreateUserDto) {
        const user = this.usersRepository.create(dto);
        const hashedPassword = await bcrypt.hash(dto.password, 5);
        const role = await this.roleService.getRoleByValue("ADMIN");
        user.roles = [role];
        user.password = hashedPassword;
        await this.usersRepository.save(user);
        return user;
    }


    async getUserById(reqUser: User, id: number) {

        // Если запрос пришел от другого пользователя (id не совпадает), то доступ запрещен
        if (reqUser.id != id) {
            throw new ForbiddenException("Нет доступа")
        }

        const user = await this.usersRepository.findOne({where: {id}, relations:{roles: true, projects: {lists: {tasks: true}}}});
        return user;
    }


    async getUsers(): Promise<User[]> {
        const users = await this.usersRepository.find({relations:{roles: true, projects: true}});
        return users;
    }


    async updateUser(user: User, id: number, dto: CreateUserDto) {
        await this.usersRepository.update(id, dto);
        return this.getUserById(user, id);
    }


    async deleteUser(user: User, id: number) {
        if (user.id == id) {
            await this.usersRepository.delete(id);
            return {message: "Пользователь удален"}
        }
        throw new ForbiddenException("Нет доступа")
    }


    async getUserByEmail(email: string){
        const user = await this.usersRepository.findOne({where: {email}, relations:{roles: true, projects: true}});
        return user;
    }


    async addRole(dto: AddRoleDto) {
        const user = await this.usersRepository.findOne({where: {id: dto.userId}, relations:{roles: true}});
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            user.roles.push(role);
            await this.usersRepository.save(user);
            return user;
        }
        throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND)
    }
}
