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
import { InputOption } from '../../../shared/input-option.model';
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

  @Input() task!: Task;

  constructor() {}

  taskForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    type: new FormControl<number | null>(null, [Validators.required ]),
    priority: new FormControl<number | null>(null , [Validators.required]),
    description: new FormControl<string>(''),
    status: new FormControl<number | null>(null, [Validators.required]),
    assignee: new FormControl<number | null>(null, [Validators.required ]),
    effort: new FormControl<number | null>(null, [Validators.required ])
 });

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    // if (this.taskForm.valid) {
    //   const task: Task = {
    //     name: this.taskForm.get('name').value,
    //     typeId: this.taskForm.get('type').value,
    //     priorityId: this.taskForm.get('priority').value,
    //     description: this.taskForm.get('description').value,
    //     statusId: this.taskForm.get('status').value,
    //     assigneeId: this.taskForm.get('assignee').value,
    //     creatorId: this.taskForm.get('creator').value,
    //   };

    //   this.taskService.createTask(task).subscribe((task) => {
    //     console.log('Added task:', task);
    //   });
    // }
  }

  taskTypes: InputOption[] = [
    {value: 0, name: 'Feature'},
    {value: 1, name: 'Bug'},
  ];

  priorities: InputOption[] = [
    {value: 0, name: 'Low'},
    {value: 1, name: 'Medium'},
    {value: 2, name: 'High'},
    {value: 2, name: 'Critical'},
  ];

  statuses: InputOption[] = [
    {value: 0, name: 'Uncommitted'},
    {value: 1, name: 'Developing'},
    {value: 2, name: 'Developed'},
    {value: 3, name: 'Testing'},
    {value: 4, name: 'Complete'},
  ];

}
