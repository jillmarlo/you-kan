import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import { Task } from '../tasks/models/task.model';
import { ColumnComponent } from '../column/column.component';
import { TaskboardActionBarComponent } from '../taskboard-action-bar/taskboard-action-bar.component';
import { TaskCardComponent } from '../tasks/components/task-card/task-card.component';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [ ColumnComponent, TaskCardComponent, TaskboardActionBarComponent, CdkDrag, CdkDropList, CdkDropListGroup,],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TaskBoardComponent implements OnInit{
  
  //Signals that manage the state of the taskboard; could be moved to a service if desired
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
    //this will be fetched via http 
    this.allTasks = [this.testTask1, this.testTask2, this.testTask3, this.testTask4];
    this.allTasksSignal.set(this.allTasks);
  }

  //Handles dropping tasks into new columns, updates task status for dropped task
  onTaskDropped(event: CdkDragDrop<Task[]>, statusList: any) {
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
        item.task_id === task.task_id ? { ...item, status: task.status } : item
      );

      this.allTasksSignal.set(updatedTasks);
    }
  }

  //Changing the project on the taskboard isn't a filter, it will fetch a new list of tasks for that project
  //TODO - make http request, for now will just reset the board
  handleProjectChange($event: number) {
    const allTasksNewReference = this.allTasks;
    this.allTasksSignal.set(allTasksNewReference);
  }

  //updates tasks on taskboard to filter by sprint, assignee, priority
  handleFiltersChange($event: any) {
    this.filterFormValues = $event;
    let allTasksFiltered: Task[] = this.allTasks;

    if ($event.sprint !== null) {
      allTasksFiltered = allTasksFiltered.filter(task =>
        task.sprint_id === $event.sprint
      )
    }
    if ($event.priority !== null) {
      allTasksFiltered = allTasksFiltered.filter(task =>
        task.priority === $event.priority
      )
    }
    if ($event.assignee !== null) {
      allTasksFiltered = allTasksFiltered.filter(task =>
        task.assignee_id === $event.assignee
      )
    }
    this.allTasksSignal.set(allTasksFiltered);
  }

  handleTaskCreated($event: Task) {
    const newTask = $event as Task;
    let newTaskArray = [...this.allTasks, newTask];

    this.allTasksSignal.set(newTaskArray);
  }

  //mock data for now
  testTask1: Task = {
    task_id: 1,
    task_title: 'Test Task 1',
    task_type: 'Bug',
    priority: 'Low',
    task_description: 'Description of task 1',
    status: 'Testing',
    creator_user_id: 5,
    effort: 2,
    sprint_id: 1,
    assignee_id: 2,
    project_id: 1
  }

  testTask2: Task = {
    task_id: 2,
    task_title: 'Test Task 2',
    task_type: 'Feature',
    priority: "Low",
    task_description: 'Description of task 2',
    status: 'Developing',
    assignee_id: 3,
    creator_user_id: 4,
    effort: 3,
    sprint_id: 1,
    project_id: 1
  }

  testTask3: Task = {
    task_id: 3,
    task_title: 'Test Task 3',
    task_type: 'Feature',
    priority: "High",
    task_description: 'Description of task 3',
    status: 'Developing',
    assignee_id: 1,
    creator_user_id: 2,
    effort: 1,
    sprint_id: 1,
    project_id: 1
  }

  testTask4: Task = {
    task_id: 4,
    task_title: 'Test Task 4',
    task_type: 'Feature',
    priority: "Medium",
    task_description: 'Description of task 4',
    status: 'Committed',
    assignee_id: 2,
    creator_user_id: 2,
    effort: 3,
    sprint_id: 2,
    project_id: 1
  }
}
