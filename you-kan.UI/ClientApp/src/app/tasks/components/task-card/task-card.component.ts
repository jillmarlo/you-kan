import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, signal, Input, OnInit, Output, computed } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { User } from '../../../user-management/models/user.model';
import { UserService } from '../../../user-management/services/user.service';
import { Sprint } from '../../../sprints/models/sprint.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgIf],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit {
  private dialog = inject(MatDialog);
  private userService = inject(UserService)
  assignee = signal<User | any>({});
  assigneeInitials = computed(() => this.assignee().first_name[0] + this.assignee().last_name[0])

  @Output() taskEdited = new EventEmitter<any>();
  @Output() taskDeleted = new EventEmitter<any>();
  @Input() usersForProject!: User[];
  @Input() sprintsForProject!: Sprint[];
  @Input() task!: Task;

  constructor() { }

  ngOnInit(): void {
    if (this.task.assignee_user_id) {
      this.userService.getUser(this.task.assignee_user_id).subscribe((user) => {
        this.assignee.set(user);
      })
    }
  }


  editDetail(editTask: Task) {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '50vw',
      maxWidth: '50vw',
      height: '650px',
      maxHeight: '650px',
      panelClass: 'custom-dialog-class',
      data: {
        project_id: this.task.project_id, task: editTask,
        usersForProject: this.usersForProject, sprintsForProject: this.sprintsForProject
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result) {
        let newTask = { ...editTask, ...result };
        this.taskEdited.emit(newTask);
        this.task = newTask;
      }
    });
  }

  deleteTask(task: Task) {
    this.taskDeleted.emit(task);
  }

  taskIsBug(): boolean {
    return this.task.task_type == "Bug"
  }

  getUserInitials(user: any): string {
    const firstInitial = user.first_name?.length > 0 ? user?.first_name[0]?.toUpperCase() : '';
    const lastInitial = user.last_name?.length > 0 ? user?.last_name[0]?.toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  }

}