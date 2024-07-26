import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { User } from '../../../user-management/models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, 
    MatDialogContent, MatDialogActions, MatDialogTitle, MatButtonModule, TextFieldModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  readonly dialogRef = inject(MatDialogRef<TaskDetailComponent>);
  readonly taskService = inject(TaskService);
 // readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  constructor() {}

  taskForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    type: new FormControl<string | null>(null, [Validators.required ]),
    priority: new FormControl<string | null>(null , [Validators.required]),
    description: new FormControl<string>(''),
    status: new FormControl<string | null>(null, [Validators.required]),
    assigneeId: new FormControl<number | null>(null),
    effort: new FormControl<number | null>(null),
    sprintId: new FormControl<number | null>(null)
 });

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value); // Pass the form values to the parent
    }

    //   this.taskService.createTask(task).subscribe((task) => {
    //     console.log('Added task:', task);
    //   });
    // }
  }

  taskTypes: string[] = ['Feature','Bug'];

  priorities: string[] = ['Low','Medium','High','Critical'];

  taskStatuses: string[] = ['Backlog','Uncommitted','Developing','Testing','Complete'];

  assignees = [{ id: 1, name: 'Developer 1' }, { id: 2, name: 'Developer 2' }, { id: 3, name: 'Developer 3' }];
  sprints = [{ id: 1, name: '7/1/24 - 7/12/24' }, { id: 2, name: '7/15/24 - 7/26/24' }, { id: 3, name: '7/29/24 - 8/9/24' }];

}
