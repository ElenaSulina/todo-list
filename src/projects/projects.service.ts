import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { createProjectDto } from './dto/create-project.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ) {}


    async createProject(userId, dto: createProjectDto) {
        const project = this.projectRepository.create(dto);
        project.user = userId;
        await this.projectRepository.save(project);
        return project;
    }


    async getAllProjects(): Promise<Project[]> {
        const projects = await this.projectRepository.find({relations: {user: true, lists: {tasks: true}}, order: {id: "ASC"}});
        return projects;
    }


    async getUsersProjects(userId): Promise<Project[]>{
        const projects = await this.projectRepository.find({ 
            relations: { lists: {tasks: true}},
            where: {user: {id: userId}},
            order: {
                id: "ASC",
                lists: {order: "ASC", tasks: {order: "ASC"}}
            }});
        return projects;
    }


    async getProjectById(user: User, id: number): Promise<Project> {
        const project = await this.projectRepository.findOne({relations: { lists: {tasks: true}}, where: {id, user: {id: user.id}}, order: {lists: {order: "ASC", tasks: {order: "ASC"}}}});
        
        if(!project) {
            throw new NotFoundException("Проект не найден")
        }
        
        return project;
    }


    async updateProject(user: User, id: number, dto: createProjectDto) {
        await this.projectRepository.update({id, user: {id: user.id}}, dto);
        return this.getProjectById(user, id);
    }

    
    async deleteProject(user: User, id: number) {
        await this.projectRepository.delete({id, user: {id: user.id}});
        return { message: 'Проект удален' }
    }
}
