import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
import { User } from 'src/users/users.entity';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ){}
    
    async signin(userDto: SignInDto){
        const user = await this.validateUser(userDto);
        return this.generateToken(user)
    }

    async signup(userDto: CreateUserDto){
        const userExists = await this.userService.getUserByEmail(userDto.email);

        if(userExists) {
            throw new HttpException("Пользователь с такой электронной почтой уже существует", HttpStatus.BAD_REQUEST);
        }

        const user = await this.userService.addUser(userDto);
        return this.generateToken(user);
    }

    private async generateToken(user: User){
        const payLoad = {
            id: user.id,
            firstName: user.firstName, 
            lastName: user.lastName,
            email: user.email,
            roles: user.roles,
        }

        return {
            token: this.jwtService.sign(payLoad)
        }
    }

    private async validateUser(userDto) {
        const user = await this.userService.getUserByEmail(userDto.email);

        if(user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            
            if(passwordEquals) {
                return user;
            }
        }

        throw new UnauthorizedException("Неверный e-mail или пароль")
    }
}
