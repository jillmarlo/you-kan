import { Component, signal, OnInit, computed, ChangeDetectionStrategy } from '@angular/core';
import { TaskByStatus } from '../shared/tasks-by-status.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule, MatNavList } from '@angular/material/list';
import { ColumnComponent } from '../column/column.component';
import { TaskCardComponent } from '../tasks/components/task-card/task-card.component';
import { DashboardActionBarComponent } from "../dashboard-action-bar/dashboard-action-bar.component";
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Task } from '../tasks/models/task.model';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ProjectListComponent } from '../projects/components/project-list/project-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, ColumnComponent, TaskCardComponent, DashboardActionBarComponent,
    MatNavList, MatListModule, CdkDrag, CdkDropList, CdkDropListGroup, MatIconModule, MatButtonModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  //Signals that manage the state of the dashboard; could be moved to a service if desired
  allTasks!: Task[];
  filterFormValues!: { sprint: number, priority: string, assignee: string };
  allTasksSignal = signal<Task[]>([]);
  backlogTasks = computed(() => this.allTasksSignal().filter(t => t.status == "Backlog"));
  committedTasks = computed(() => this.allTasksSignal().filter(t => t.status == "Committed"));
  developingTasks = computed(() => this.allTasksSignal().filter(t => t.status == "Developing"));
  testingTasks = computed(() => this.allTasksSignal().filter(t => t.status == "Testing"));
  doneTasks = computed(() => this.allTasksSignal().filter(t => t.status == "Done"));

  allTasksByStatus = computed(() => {
    return [{ status: "Backlog", tasks: this.backlogTasks() }, { status: "Committed", tasks: this.committedTasks() },
    { status: "Developing", tasks: this.developingTasks() }, { status: "Testing", tasks: this.testingTasks() }, { status: "Done", tasks: this.doneTasks() }
    ]
  })

  ngOnInit(): void {
    this.allTasks = [this.testTask1, this.testTask2, this.testTask3, this.testTask4];
    this.allTasksSignal.set(this.allTasks);
  }

  //Handles dropping tasks into new columns, updates task status for dropped task
  onTaskDropped(event: CdkDragDrop<Task[]>, statusList: any) {
    debugger;
    if (event.previousContainer === event.container) {
      moveItemInArray(statusList.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      task.status = statusList.status;

      //TODO - Make an HTTP request to save new status in db

      const updatedTasks = this.allTasksSignal().map(item =>
        item.id === task.id ? { ...item, status: task.status } : item
      );

      this.allTasksSignal.set(updatedTasks);
    }
  }

  //Changing the project on the dashboard isn't a filter, it will fetch a new list of tasks for that project
  //TODO - make http request, for now will just reset the board
  handleProjectChange($event: number) {
    const allTasksNewReference = this.allTasks;
    this.allTasksSignal.set(allTasksNewReference);
  }

  //updates tasks on dashboard to filter by sprint, assignee, priority
  handleFiltersChange($event: any) {
    this.filterFormValues = $event;
    let allTasksFiltered: Task[] = this.allTasks;

    if ($event.sprint !== null) {
      allTasksFiltered = allTasksFiltered.filter(task =>
        task.sprintId === $event.sprint
      )
    }
    if ($event.priority !== null) {
      allTasksFiltered = allTasksFiltered.filter(task =>
        task.priority === $event.priority
      )
    }
    if ($event.assignee !== null) {
      allTasksFiltered = allTasksFiltered.filter(task =>
        task.assigneeId === $event.assignee
      )
    }
    this.allTasksSignal.set(allTasksFiltered);
  }

  handleTaskCreated($event: Task) {
    const newTask = $event as Task;
    let newTaskArray = [...this.allTasks, newTask];

    this.allTasksSignal.set(newTaskArray);
  }

  //to implement
  openUserDetail() { }

  //to implemet
  logout() { }
  

  //mock data for now
  testTask1: Task = {
    id: 1,
    name: 'Test Task 1',
    type: 'Bug',
    priority: 'Low',
    description: 'Description of task 1',
    status: 'Testing',
    assigneeId: 1,
    creatorId: 5,
    effort: 2,
    sprintId: 1
  }

  testTask2: Task = {
    id: 2,
    name: 'Test Task 2',
    type: 'Feature',
    priority: "Low",
    description: 'Description of task 2',
    status: 'Developing',
    assigneeId: 3,
    creatorId: 4,
    effort: 3,
    sprintId: 1
  }

  testTask3: Task = {
    id: 3,
    name: 'Test Task 3',
    type: 'Feature',
    priority: "High",
    description: 'Description of task 3',
    status: 'Developing',
    assigneeId: 1,
    creatorId: 2,
    effort: 1,
    sprintId: 1
  }

  testTask4: Task = {
    id: 4,
    name: 'Test Task 4',
    type: 'Feature',
    priority: "Medium",
    description: 'Description of task 4',
    status: 'Committed',
    assigneeId: 2,
    creatorId: 2,
    effort: 3,
    sprintId: 2
  }
}
