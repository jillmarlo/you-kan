import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TaskDetailComponent } from '../tasks/components/task-detail/task-detail.component';
import { SprintDetailComponent } from '../sprints/sprint-detail.component';
import { Task } from '../tasks/models/task.model';

@Component({
  selector: 'app-taskboard-action-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './taskboard-action-bar.component.html',
  styleUrl: './taskboard-action-bar.component.css'
})
export class TaskboardActionBarComponent implements OnInit {
  @Output() projectChanged = new EventEmitter<number>();
  @Output() taskboardFiltersChanged = new EventEmitter<any>();
  @Output() taskCreated = new EventEmitter<Task>();

  public dialog = inject(MatDialog);

  projects = [{ id: 1, name: 'Project XYZ' }, { id: 2, name: 'Project ABC' }];
  priorities = ['Low', 'Medium', 'High', 'Critical'];
  assignees = [{ id: 1, name: 'Developer 1' }, { id: 2, name: 'Developer 2' }, { id: 3, name: 'Developer 3' }];
  sprints = [{ id: 1, name: '7/1/24 - 7/12/24' }, { id: 2, name: '7/15/24 - 7/26/24' }, { id: 3, name: '7/29/24 - 8/9/24' }];

  projectInput = new FormGroup({
    project: new FormControl<number | null>(null, [Validators.required]),
  });

  taskboardFilters = new FormGroup({
    sprint: new FormControl<number | null>(null),
    priority: new FormControl<string | null>(null),
    assignee: new FormControl<number | null>(null)
  });


  ngOnInit(): void {
    //TODO: Get project, sprint, assignee options and assign them to dropdowns
    this.projectInput.get('project')?.setValue(1);

    this.taskboardFilters.valueChanges.subscribe(values =>
      this.taskboardFiltersChanged.emit(values)
    )
  }

  onProjectChange(event: any) {
    this.projectChanged.emit(event.value);
    this.taskboardFilters.reset();
  }


  openSprint(): void {
    const sprintRef = this.dialog.open(SprintDetailComponent);

    sprintRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
      }
    });
  }

  openTaskDetail(): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, { height: '600px', width: '600px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        const newTask: Task = {
          id: null, name: result.name, type: result.type, priority: result.priority,
          description: result.description, status: result.status, assigneeId: result.assignee ?? null,
          creatorId: 1, effort: result.effort ?? null, sprintId: result.sprintId ?? null
        }
        this.taskCreated.emit(newTask);
      }
    });
  }

}