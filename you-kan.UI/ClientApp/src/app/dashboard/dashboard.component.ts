import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule, MatNavList } from '@angular/material/list';
import { RouterOutlet, RouterLink, Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from '../projects/components/project-list/project-list.component';
import { TaskBoardComponent } from '../task-board/task-board.component';
import { UsersComponent } from '../user-management/components/users/users.component';
import { routes } from '../app.routes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatButtonModule, MatNavList, MatListModule, MatIconModule, MatButtonModule,
    RouterModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent  {

    //to implement
    openUserDetail() { }

    //to implemet
    logout() { }

}
