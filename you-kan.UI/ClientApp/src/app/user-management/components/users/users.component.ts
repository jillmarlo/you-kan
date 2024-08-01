import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { User } from '../../models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UsersDetailComponent } from './users-detail.component';

@Component({
  selector: 'app-users-component',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogClose
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  public dialog = inject(MatDialog);

  // replace with endpoint
  userData: User[] = [
    {user_id: 1, first_name: 'John', last_name: 'Smith', email: 'jsmith@test.com', password_hash: 'testing123', created_at: 'Date here'}, 
    { user_id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jdoe@test.com', password_hash: 'testing456', created_at: 'Date here'},
    { user_id: 3, first_name: 'Hannibal', last_name: 'Lecter', email: 'hlecter@test.com', password_hash: 'wgraham123', created_at: 'Date here'}
  ];

  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'actions'];
  dataSource = this.userData;

  editUser(user: any) {
    console.log('Edit user', user);
    // Implement edit logic
  }

  deleteUser(user: any) {
    console.log('Delete user', user);
    // Implement delete logic
  }

  openUser(): void {
    const sprintRef = this.dialog.open(UsersDetailComponent);

    sprintRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
      }
    });
  }
}
