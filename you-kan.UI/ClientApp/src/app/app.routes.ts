import { Routes } from '@angular/router';
import { ProjectListComponent } from './projects/components/project-list/project-list.component';
import { UsersComponent } from './user-management/components/users/users.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { HomeComponent } from './home/home.component';

// Testing 

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'task-board', component: TaskBoardComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard] },

];
