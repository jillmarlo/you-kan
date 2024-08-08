import { ChangeDetectionStrategy, Component, inject, Input, Output, EventEmitter } from '@angular/core';
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
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, 
    MatDialogContent, MatDialogActions, MatDialogTitle, MatButtonModule, TextFieldModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  // readonly dialogRef = inject(MatDialogRef<SignUpComponent>);
  readonly userService = inject(UsersService);
  public dialog = inject(MatDialog);
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
    // exit logic here 
  }

  openUser(): void {
    const signUpRef = this.dialog.open(SignUpComponent);

    signUpRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
      }
    });
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
