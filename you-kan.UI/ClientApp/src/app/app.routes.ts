import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { ProjectListComponent } from './projects/components/project-list/project-list.component';
import { UsersComponent } from './user-management/components/users/users.component';

export const routes: Routes = [
    { path: 'projects', component: ProjectListComponent },
    { path: 'users', component: UsersComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule],
    providers: []
})

export class Routing { }