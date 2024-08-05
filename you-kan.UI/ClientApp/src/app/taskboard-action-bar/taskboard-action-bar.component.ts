import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TaskDetailComponent } from '../tasks/components/task-detail/task-detail.component';
import { Task } from '../tasks/models/task.model';
import { Project } from '../projects/models/project.model';
import { ProjectService } from '../projects/services/project.service';
import { User } from '../user-management/models/user.model';
import { Sprint } from '../sprints/models/sprint.model';

@Component({
  selector: 'app-taskboard-action-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './taskboard-action-bar.component.html',
  styleUrl: './taskboard-action-bar.component.css'
})
export class TaskboardActionBarComponent implements OnInit {
  private projectService = inject(ProjectService);
  @Output() projectChanged = new EventEmitter<number>();
  @Output() taskboardFiltersChanged = new EventEmitter<any>();
  @Output() taskCreated = new EventEmitter<Task>();
  projects!: Project[];
  selectedProjectId: number | null = null;
  sprintsForProject!: Sprint[];
  usersForProject!: User[];


  public dialog = inject(MatDialog);

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
    this.loadProjects();
  
    this.taskboardFilters.valueChanges.subscribe(values =>
      this.taskboardFiltersChanged.emit(values)
    )
  }

  loadProjects() {
    this.projectService.getProjectsForUser().subscribe(
      (data: Project[]) => {
        this.projects = data;
      }
    );
  }

  onProjectChange(event: any) {
    if (event.value == null) {
      this.selectedProjectId = null;
      this.taskboardFilters.reset();
      this.projectChanged.emit(event.value);

    }
    else {
      this.selectedProjectId = event.value;
      this.projectChanged.emit(event.value);
      this.taskboardFilters.reset();


    }
  }

  addNewTask(): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '50vw',
      maxWidth: '50vw',
      height: '650px',
      maxHeight: '650px',
      data: { project_id: this.selectedProjectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newTask: Task = {
          task_id: null, task_title: result.task_title, task_type: result.task_type, priority: result.priority,
          task_description: result.task_description, status: result.status,
          effort: result.effort, sprint_id: result.sprint_id ?? null, project_id: this.selectedProjectId
        }
        this.taskCreated.emit(newTask);
      }
    });
  }

}
