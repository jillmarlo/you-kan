import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TaskDetailComponent } from '../tasks/components/task-detail/task-detail.component';
import { SprintDetailComponent } from '../sprints/sprint-detail.component';

@Component({
  selector: 'app-dashboard-action-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './dashboard-action-bar.component.html',
  styleUrl: './dashboard-action-bar.component.css'
})
export class DashboardActionBarComponent implements OnInit {

  public dialog = inject(MatDialog);

projects = [{value: 1, name: 'Project XYZ'}, {value: 2, name: 'Project ABC'}];
priorities = ['low', 'medium', 'high', 'critical'];
assigneeOptions = [{value: 1, name: 'Developer 1'}, {value:2, name: 'Developer 2'}, {value: 3, name:'Developer 3'}];

  projectInput = new FormGroup({
    project: new FormControl<number | null>(null, [Validators.required]),
 });

 dashboardFilters = new FormGroup({
  priority: new FormControl<string>(''),
  assignee: new FormControl<number | null>(null)
});

 ngOnInit(): void {
  this.projectInput.get('project')?.setValue(1);
}

  openSprint(): void {
    const sprintRef = this.dialog.open(SprintDetailComponent);

    sprintRef.afterClosed().subscribe(result => {
      if (result !== undefined){
      }
    });
  }

  openTaskDetail(): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, { height: '600px', width: '600px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }

}
