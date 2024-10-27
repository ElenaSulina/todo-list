import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { createListDto } from './dto/create-list.dto';
import { List } from './lists.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { moveListDto } from './dto/move-list.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class ListsService {
    constructor(
        @InjectRepository(List)
        private listRepository: Repository<List>,
    ) {}


    async createList(dto: createListDto) {
        const list = this.listRepository.create(dto);

        // Посчитать количество списков в проекте с данным id
        const count = await this.listRepository.countBy({project: {id: Number(dto.project)}});

        // Присвоить новому списку порядковый номер (кол-во + 1)
        list.order = (count + 1);

        // Добавить список в проект, вернуть список
        await this.listRepository.save(list);
        return list;   
    }


    async getListById(user: User, id: number): Promise<List> {
        const list = await this.listRepository.findOne({relations: { tasks: true, project: true}, where: {id, project: {user: {id: user.id}}}, order: {tasks: {order: "ASC"}},});
        if (!list) {
            throw new NotFoundException("Список задач не найден")
        }
        return list;
    }


    async updateList(user: User, id: number, dto: createListDto) {
        const list = await this.getListById(user, id);
        if (list) {
            list.name = dto.name;
            await this.listRepository.update({id}, dto);
        }
        return list;
    }


    async moveList(user: User, id: number, dto: moveListDto) {

        const list: List = await this.getListById(user, id);

        if(list) {

            const listsInProject: List[] = await this.listRepository.find({where: {project: {id: list.project.id}}});

            let currentOrder = list.order;
            const newOrder = dto.order;
            
            // Если порядковый номер нужно уменьшить, 
            if(currentOrder > newOrder) {
                for (let item of listsInProject) {
                    if (item.order >= newOrder && item.order < currentOrder) {

                        // увеличить элементы между старым и новым порядковыми номерами
                        await this.listRepository.increment({id: item.id}, "order", 1)
                    }  
                }
            }


            // Если порядковый номер нужно увеличить
            if(currentOrder < newOrder) {
                for (let item of listsInProject) {
                    if (item.order <= newOrder && item.order > currentOrder) {

                        //уменьшить элементы между старым и новым порядковыми номерами
                        await this.listRepository.decrement({id: item.id}, "order", 1)
                    }  
                }
            }

            // После того, как сдвинули остальные элементы, присвоить новый порядковый номер
            list.order = newOrder;
            
            await this.listRepository.save(list)
        }
        return list;
    }

    
    async deleteList(user: User, id: number) {
        const list = await this.getListById(user, id);
        const lists = await this.listRepository.find({where: {project: {id: list.project.id}}})

        if (!list) {
            return list
        }

        if (lists) {
            for (let item of lists) {
                if (item.order > list.order) {
                    item.order -= 1;
                    await this.listRepository.save(item);
                }
            }     
        }

        await this.listRepository.delete(id);
        return {message: "Список задач удален"};
    }
}