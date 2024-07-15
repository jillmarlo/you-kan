import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../../user-management/models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Cards } from '../../models/task.model';
import { TaskType } from '../../models/task-type.enum';
import { Priority } from '../../models/priority.enum';
import { TaskStatus } from '../../models/task-status.enum';
import { InputOption } from '../../../shared/input-option.model';


@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  @Input() task!: Cards;
  
  constructor() {}

  taskTypeOptions: InputOption[] = [
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

  taskForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    type: new FormControl<number | null>(null, [Validators.required ]),
    priority: new FormControl<number | null>(null , [Validators.required]),
    description: new FormControl<string>(''),
    status: new FormControl<number | null>(null, [Validators.required]),
    assignee: new FormControl<Users | null>(null, [Validators.required ]),
    creator: new FormControl<Users | null>(null, [Validators.required ]),
    effort: new FormControl<number | null>(null, [Validators.required ])
 });

}
