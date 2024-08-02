import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-project-form',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './new-project-form.component.html',
  styleUrl: './new-project-form.component.css'
})
export class NewProjectFormComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<NewProjectFormComponent>);
  private fb = inject(FormBuilder);
  projectForm!: FormGroup;

  constructor() {
    this.projectForm = this.fb.group({
      project_name: ['', Validators.required],
   } )}

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.dialogRef.close({
        ...this.projectForm.value,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
