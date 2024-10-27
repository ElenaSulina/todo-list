import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/projects/projects.entity';
import { Role } from 'src/roles/roles.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  
  @ApiProperty({ example: 1,  description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Иван',  description: 'Имя'})
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Иванов',  description: 'Фамилия'})
  @Column()
  lastName: string;

  @ApiProperty({ example: 'example@gmail.com',  description: 'E-mail'})
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '12345678',  description: 'Пароль'})
  @Column()
  password: string;

  @ApiProperty({ example: 'true',  description: 'Активный аккаунт или нет'})
  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Role, (role) => role.users, {cascade: true})
  @JoinTable({name: "user_roles"})
  roles: Role[];

  @OneToMany(() => Project, (project) => project.user, {cascade: true})
  projects: Project[];
}