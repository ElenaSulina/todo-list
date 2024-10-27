import { ApiProperty } from '@nestjs/swagger';
import { List } from 'src/lists/lists.entity';
import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('projects')
export class Project {
  
  @ApiProperty({ example: 1,  description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Мои дела',  description: 'Название проекта'})
  @Column({ nullable: true})
  name: string;

  @ApiProperty({ example: 'Список моих дел',  description: 'Описание проекта'})
  @Column({ nullable: true})
  description: string;

  @ApiProperty({ example: '2024-01-01 01:01:00',  description: 'Дата и время создания'})
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.projects, {onDelete: "CASCADE"})
  user: User

  @OneToMany(() => List, (list) => list.project, {cascade: true})
  lists: List[];
}