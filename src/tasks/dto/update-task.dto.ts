import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { List } from "src/lists/lists.entity";

export class createTaskDto {

  @ApiProperty({ example: 'Сделать tasks',  description: 'Название задачи'})
  @IsString({message: "Некорректное название задачи"})
  readonly name: string;

  @ApiProperty({ 
      example: '1. Название 2. Описание 3. Дата и время создания 4.Создание, удаление, изменение. 5. Перетаскивание',  
      description: 'Описание задачи'})
  @IsString({message: "Некорректное описание задачи"})
    readonly description: string;
}