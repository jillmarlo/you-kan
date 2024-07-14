import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../../user-management/models/user.model';



@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  protected fb = inject(FormBuilder)
  
  constructor() {}

  taskForm = this.fb.group({
    name: new FormControl<string>('', [Validators.required]),
    type: new FormControl<number | null>(null, [Validators.required ]),
    priority: new FormControl<number | null>(null , [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    status: new FormControl<number | null>(null, [Validators.required]),
    assignee: new FormControl<User | null>(null, [Validators.required ]),
    creator: new FormControl<User | null>(null, [Validators.required ]),
    effort: new FormControl<number | null>(null, [Validators.required ])
 });

}
