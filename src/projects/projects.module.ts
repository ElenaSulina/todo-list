import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService],
    imports: [
        TypeOrmModule.forFeature([Project]),
        AuthModule
    ],
    exports: [ProjectsService]
})
export class ProjectsModule {}
