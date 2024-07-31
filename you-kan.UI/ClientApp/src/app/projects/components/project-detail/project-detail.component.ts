import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../user-management/models/user.model';
import { Sprint } from '../../../sprints/models/sprint.model';
import { SprintDetailComponent } from '../../../sprints/components/sprint-detail.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatChipsModule,
    MatButtonModule, MatInputModule, MatCardModule, MatSelectModule, MatIconModule, MatListModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
  private dialog = inject(MatDialog);

  @Input() project: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  projectForm: FormGroup;
  selectedUsers: User[] = [];

  availableUsers: User[] = [
    { user_id: 1, first_name: 'John', last_name: 'Smith', email: 'jsmith@test.com', password_hash: 'testing123', created_at: 'Date here' },
    { user_id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jdoe@test.com', password_hash: 'testing456', created_at: 'Date here' },
    { user_id: 3, first_name: 'Hannibal', last_name: 'Lecter', email: 'hlecter@test.com', password_hash: 'wgraham123', created_at: 'Date here' }
  ];


  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      project_name: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.project) {
      this.projectForm.patchValue(this.project);
      this.selectedUsers = this.project.users || [];
    }
  }

  addUser(user: User) {
    if (!this.selectedUsers.find(u => u.user_id === user.user_id)) {
      this.selectedUsers.push(user);
      this.availableUsers = this.availableUsers.filter(u => u.user_id !== user.user_id);
    }
  }

  removeUser(user: User) {
    this.selectedUsers = this.selectedUsers.filter(u => u.user_id !== user.user_id);
    this.availableUsers.push(user);
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const updatedProject = {
        ...this.projectForm.value,
        users: this.selectedUsers
      };
      this.save.emit(updatedProject);
    }
  }

  addSprint() {
    const dialogRef = this.dialog.open(SprintDetailComponent, {
      width: '300px',
      data: { projectId: this.project.project_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.project.sprints.push({
          ...result
        });
      }
    });
  }

  editSprint(editSprint: Sprint) {
    const dialogRef = this.dialog.open(SprintDetailComponent, {
      width: '300px',
      data: { projectId: this.project.project_id, sprint: editSprint }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.project.sprints.findIndex((s: { id: number | undefined; }) => s.id === editSprint.sprint_id);
        if (index !== -1) {
          this.project.sprints[index] = { ...editSprint, ...result };
        }
      }
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
