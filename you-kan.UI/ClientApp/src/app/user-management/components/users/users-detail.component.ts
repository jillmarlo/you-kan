import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { InputOption } from '../shared/input-option.model';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { User } from '../../models/user.model';
import { UsersService } from './users.service';



@Component({
  selector: 'app-users-detail',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, 
    MatDialogContent, MatDialogActions, MatDialogTitle, MatButtonModule, TextFieldModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.css'
})
export class UsersDetailComponent {
  readonly dialogRef = inject(MatDialogRef<UsersDetailComponent>);
  readonly userService = inject(UsersService);
 // readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  @Input() user!: User;

  constructor() {}

  userForm = new FormGroup({
    first_name: new FormControl<string>('', [Validators.required]),
    last_name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    passoword_hash: new FormControl<string>('', [Validators.required]),
    created_at: new FormControl(new Date(), [Validators.required]),
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
}