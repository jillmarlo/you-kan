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
import { Priority } from '../tasks/models/priority.enum';
import { TaskType } from '../tasks/models/task-type.enum';
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

  //statuses: string[] = ['Backlog', 'Committed', 'Developing', 'Testing', 'Done'];

  drop(event: CdkDragDrop<any[] | string[] | any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  //to implement
  openUserDetail() { }

  //to implemet
  logout() { }


  //mock data for now
  testTask1 = {
    name: 'Test Task 1',
    type: TaskType.Feature,
    priority: Priority.Low,
    description: 'Description of task 1',
    status: "Developing",
    assignee: "Test Dev",
    effort: 2
  }

  testTask2 = {
    name: 'Test Task 2',
    type: TaskType.Feature,
    priority: Priority.Low,
    description: 'Description of task 2',
    status: "Developing",
    assignee: "Test Dev2",
    effort: 3
  }

  backlogTasks = [];
  committedTasks = [];
  developingTasks = [this.testTask1];
  testingTasks = [this.testTask2];
  doneTasks = [];

  allTasks: any[] = [{status: 'backlog', tasks: this.backlogTasks}, {status: 'committed', tasks: this.committedTasks}
    , {status: 'developing', tasks: this.developingTasks}, {status: 'testing', tasks: this.testingTasks}, {status: 'done', tasks: this.doneTasks}]



}
