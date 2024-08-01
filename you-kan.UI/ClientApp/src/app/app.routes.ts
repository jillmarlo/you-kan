import { Routes } from '@angular/router';
import { ProjectListComponent } from './projects/components/project-list/project-list.component';
import { UsersComponent } from './user-management/components/users/users.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { LoginComponent } from './user-management/components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'task-board', pathMatch: 'full' },
    { path: 'task-board', component: TaskBoardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'projects', component: ProjectListComponent },
    { path: 'login', component: LoginComponent},
];
