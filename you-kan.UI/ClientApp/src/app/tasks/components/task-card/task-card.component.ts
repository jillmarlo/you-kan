import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  private dialog = inject(MatDialog);
  @Output() taskEdited = new EventEmitter<any>();
  @Output() taskDeleted = new EventEmitter<any>();
  @Input() task!: any;

  constructor() {}

  editDetail(editTask: Task) {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '50vw',
      maxWidth: '50vw',
      height: '650px',
      maxHeight: '650px',
      data: { project_id: this.task.project_id, task: editTask }
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
}