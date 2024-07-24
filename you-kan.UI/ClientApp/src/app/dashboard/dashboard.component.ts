import { Component } from '@angular/core';
import { TaskByStatus } from '../shared/tasks-by-status.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatNavList } from '@angular/material/list';
import { ColumnComponent } from '../column/column.component';
import { TaskCardComponent } from '../tasks/components/task-card/task-card.component';
import { DashboardActionBarComponent } from "../dashboard-action-bar/dashboard-action-bar.component";
import {
        CdkDragDrop,
        moveItemInArray,
        transferArrayItem,
        CdkDrag,
        CdkDropList,
        CdkDropListGroup
} from '@angular/cdk/drag-drop';
import { Task } from '../tasks/models/task.model';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ProjectListComponent } from '../projects/components/project-list/project-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, ColumnComponent, TaskCardComponent, DashboardActionBarComponent,
    MatNavList, MatListModule, CdkDrag, CdkDropList, CdkDropListGroup, MatIconModule, MatButtonModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  onTaskDropped(event: CdkDragDrop<Task[]>, column: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(column.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  //to implement
  openUserDetail() { }

  //to implemet
  logout() { }


  //mock data for now
  testTask1 : Task = {
    id: 1,
    name: 'Test Task 1',
    type: 'Bug',
    priority: 'Low',
    description: 'Description of task 1',
    status: 'Testing',
    assigneeId: 3,
    creatorId: 5,
    effort: 2
  }

  testTask2 = {
    id: 2,
    name: 'Test Task 2',
    type: 'Feature',
    priority: "Low",
    description: 'Description of task 2',
    status: 'Developing',
    assigneeId: 7,
    creatorId: 4,
    effort: 3
  }


  backlogTasks = [];
  committedTasks = [];
  developingTasks = [this.testTask1];
  testingTasks = [this.testTask2];
  doneTasks = [];

  allTasks: any[] = [{status: 'Backlog', tasks: this.backlogTasks}, {status: 'Committed', tasks: this.committedTasks}
    , {status: 'Developing', tasks: this.developingTasks}, {status: 'Testing', tasks: this.testingTasks}, {status: 'Done', tasks: this.doneTasks}]
    
}
