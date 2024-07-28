import { bootstrapApplication } from '@angular/platform-browser';
//import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//import { importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
//import { DashboardComponent } from './app/dashboard/dashboard.component';
//import { TaskBoardComponent } from './app/task-board/task-board.component';
//import { UsersComponent } from './app/user-management/components/users/users.component';
//import { ProjectListComponent } from './app/projects/components/project-list/project-list.component';
import { routes } from './app/app.routes';
//import { provideHttpClient } from '@angular/common/http'; 


bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)
  ]
}).catch(err => console.error(err));
