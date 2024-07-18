import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TaskDetailComponent } from '../tasks/components/task-detail/task-detail.component';

@Component({
  selector: 'app-dashboard-action-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './dashboard-action-bar.component.html',
  styleUrl: './dashboard-action-bar.component.css'
})
export class DashboardActionBarComponent {
  public dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDetailComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        //this.animal.set(result);
      }
    });
  }

}
