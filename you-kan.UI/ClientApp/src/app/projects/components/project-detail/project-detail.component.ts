import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
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
import { UsersService } from '../../../user-management/components/users/users.service';
import { SprintService } from '../../../sprints/services/sprint.service';
import { concatMap, of } from 'rxjs';


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
  private userService = inject(UsersService);
  private sprintService = inject(SprintService);
  @Input() project: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  projectForm: FormGroup;
  availableUsers: User[] = [];
  projectUsers = signal<User[]>([]);
  projectSprints = signal<Sprint[]>([]);

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      project_name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.availableUsers = users.data;
    })

    if (this.project) {
      this.projectForm.patchValue(this.project);
      this.projectUsers.set(this.project.users ?? []);
      this.projectSprints.set(this.project.sprints ?? []);
    }
  }

  //TODO actually make http req to save user to this project
  addUser(user: User) {
    if (this.projectUsers().length == 0) {
      this.projectUsers.set([user]);
      this.availableUsers = this.availableUsers.filter(u => u.user_id !== user.user_id);
    }
    else if (!this.projectUsers().find(u => u.user_id === user.user_id)) {
      this.projectUsers.set([...this.projectUsers(), user]);
      this.availableUsers = this.availableUsers.filter(u => u.user_id !== user.user_id);
    }
  }

  //TODO actually make http req to remove this user from project
  removeUser(user: User) {
    this.projectUsers.set(this.projectUsers().filter(u => u.user_id !== user.user_id));
    this.availableUsers.push(user);
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const updatedProject = {
        ...this.projectForm.value, project_id: this.project.project_id
      };
      this.save.emit(updatedProject);
    }
  }

  addSprint() {
    const dialogRef = this.dialog.open(SprintDetailComponent, {
      width: '300px',
      data: { projectId: this.project.project_id }
    });

    dialogRef.afterClosed()
      .pipe(
        concatMap(result => {
          if (result) {
            return this.sprintService.createSprint({...result, project_id: this.project.project_id});
          } else {
            return of(null);
          }
        })
      ).subscribe(result => {
        if (result) {
          if (this.projectSprints().length == 0) {
            this.projectSprints.set([result])
          }
          else {
          this.projectSprints.update(sprints => {
           return [...sprints, result]
          });
        }
        }
      });
  }

  editSprint(editSprint: Sprint) {
    const dialogRef = this.dialog.open(SprintDetailComponent, {
      width: '300px',
      data: { projectId: this.project.project_id, sprint: editSprint }
    });

    dialogRef.afterClosed()
    .pipe(
      concatMap(result => {
        if (result) {
          return this.sprintService.updateSprint(result);
        } else {
          return of(null);
        }
      })
    ).subscribe(result => {
      if (result) {
        let newArray = this.projectSprints();
        const index = newArray.findIndex((s: Sprint) => s.sprint_id === editSprint.sprint_id);
        if (index !== -1) {
          newArray[index] = { ...editSprint, ...result };
          this.projectSprints.set(newArray);
        }
      }
    });
  }

  deleteSprint(sprint: Sprint) {
    this.sprintService.deleteSprint(sprint.sprint_id).subscribe(() => {
      let newArray = this.projectSprints().filter(s => s.sprint_id !== sprint.sprint_id);
      this.projectSprints.set(newArray);
    })
  }

  onCancel() {
    this.cancel.emit();
  }
}
