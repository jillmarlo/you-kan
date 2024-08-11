import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { User } from '../../user-management/models/user.model';



@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule, TextFieldModule, MatDialogContent, MatDialogActions, MatDialogTitle],
  providers: [],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.css'
})
export class UserIconComponent {
  @Input() user: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  readonly dialogRef = inject(MatDialogRef<UserIconComponent>);

  accountForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.user) {
      this.accountForm.patchValue(this.user);
    }
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const updatedUser = {
        ...this.accountForm.value,
      };
      this.save.emit(updatedUser);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}