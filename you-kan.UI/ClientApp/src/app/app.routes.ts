import { Routes } from '@angular/router';
import { ProjectListComponent } from './projects/components/project-list/project-list.component';
import { UsersComponent } from './user-management/components/users/users.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    { path: 'main', component: MainComponent,
        children: [
            { path: 'task-board', component: TaskBoardComponent },
            { path: 'users', component: UsersComponent },
            { path: 'projects', component: ProjectListComponent }, 
        ]
     },
    { path: 'home', component: HomeComponent},
    { path: 'task-board', component: TaskBoardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'projects', component: ProjectListComponent },
    { path: 'main', component: MainComponent}

];
