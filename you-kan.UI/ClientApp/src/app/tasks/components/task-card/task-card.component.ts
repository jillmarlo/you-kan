import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { User } from '../../../user-management/models/user.model';
import { UserService } from '../../../user-management/services/user.service';

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
  @Output() taskEdited = new EventEmitter<any>();
  @Output() taskDeleted = new EventEmitter<any>();
  @Input() usersForProject!: User[];
  @Input() task!: Task;
  protected taskUser: any = {};

  constructor() {
  }

  ngOnInit(): void {
    if (this.task.assignee_id) {
      this.userService.getUser(this.task.assignee_id).subscribe((user) => {
        this.taskUser = user;
      })
    }
    else this.task.assignee_id = null;
  }


  editDetail(editTask: Task) {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '50vw',
      maxWidth: '50vw',
      height: '650px',
      maxHeight: '650px',
      data: { project_id: this.task.project_id, task: editTask, usersForProject: this.usersForProject }
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result) {
          this.task = { ...editTask, ...result };
          this.taskEdited.emit(editTask)
        
      }
    });
  }

  deleteTask(task: Task) {
    this.taskDeleted.emit(task);
  }

  taskIsBug(): boolean {
    return this.task.task_type == "Bug"
  }

  getUserInitials(user: any): string{
    const firstInitial = user.first_name.length > 0 ? user.first_name[0].toUpperCase() : '';
    const lastInitial = user.last_name.length > 0 ? user.last_name[0].toUpperCase() : '';
  
    return `${firstInitial}${lastInitial}`;
  }

}