import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  private dialog = inject(MatDialog);
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
      if (result) {
          this.task = { ...editTask, ...result };
        
      }
    });
  }
}