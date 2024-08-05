import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Task } from '../tasks/models/task.model';
import { ColumnComponent } from '../column/column.component';
import { TaskboardActionBarComponent } from '../taskboard-action-bar/taskboard-action-bar.component';
import { TaskCardComponent } from '../tasks/components/task-card/task-card.component';
import { TaskService } from '../tasks/services/task.service';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [ ColumnComponent, TaskCardComponent, TaskboardActionBarComponent, CdkDrag, CdkDropList, CdkDropListGroup,],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
})

export class TaskBoardComponent implements OnInit{
  taskService = inject(TaskService);
  
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
    this.allTasks = [];
    //this.allTasksSignal.set(this.allTasks);
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

      // const updatedTasks = this.allTasksSignal().map(item =>
      //   item.task_id === task.task_id ? { ...item, status: task.status } : item
      // );

     // this.allTasksSignal.set(updatedTasks);
    }
  }

  //Changing the project on the taskboard isn't a filter, it will fetch a new list of tasks for that project
  //TODO - make http request, for now will just reset the board
  handleProjectChange($event: number) {

    if ($event == null) {
      this.allTasks = [];
    }

    let allTasksNewReference: Task[] = [];

    this.taskService.getTasksForProject($event).subscribe(
      (data: Task[]) => {
        this.allTasks = data;
        allTasksNewReference = this.allTasks;
        this.allTasksSignal.set(allTasksNewReference);
      }
    )
  }

  //updates tasks on taskboard to filter by sprint, assignee, priority
  handleFiltersChange($event: any) {
    // this.filterFormValues = $event;
    // let allTasksFiltered: Task[] = this.allTasks;

    // if ($event.sprint !== null) {
    //   allTasksFiltered = allTasksFiltered.filter(task =>
    //     task.sprint_id === $event.sprint
    //   )
    // }
    // if ($event.priority !== null) {
    //   allTasksFiltered = allTasksFiltered.filter(task =>
    //     task.priority === $event.priority
    //   )
    // }
    // if ($event.assignee !== null) {
    //   allTasksFiltered = allTasksFiltered.filter(task =>
    //     task.assignee_id === $event.assignee
    //   )
    // }
    // this.allTasksSignal.set(allTasksFiltered);
  }
  

  handleTaskCreated($event: Task) {
    const newTask = $event as Task;
    let allTasksNewReference: Task[] = [];

    this.taskService.createTask(newTask).subscribe(
      (data: Task) => {
        newTask.task_id = data.task_id;
        allTasksNewReference = [...this.allTasks, newTask];
        this.allTasksSignal.set(allTasksNewReference);
      }
    )
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task.task_id).subscribe(() => {
      let newArray = this.allTasks.filter((t) => t.task_id !== task.task_id);
      this.allTasks = newArray;
      this.allTasksSignal.set(newArray);
    })
  }

  updateTask(task: any) {
    debugger;
    this.taskService.updateTask(task).subscribe((data: any) => {
      let updatedArray = this.allTasks
        .filter((t) => t.task_id !== task.task_id)
        .concat(task);

      this.allTasks = updatedArray;
      this.allTasksSignal.set(updatedArray);
    })
  }


}
