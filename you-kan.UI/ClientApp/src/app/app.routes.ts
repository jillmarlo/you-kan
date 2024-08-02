import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { ProjectListComponent } from './projects/components/project-list/project-list.component';
import { UsersComponent } from './user-management/components/users/users.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'task-board', pathMatch: 'full' },
    { path: 'task-board', component: TaskBoardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'projects', component: ProjectListComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent }
];
