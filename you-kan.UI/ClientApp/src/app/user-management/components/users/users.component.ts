import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersDetailComponent } from './users-detail.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { UsersService } from './users.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-component',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatDialogModule, NgFor, NgIf, UpperCasePipe, UsersDetailComponent, 
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  animations:[
    trigger('detailExpand', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class UsersComponent implements OnInit {
  private fb = inject(FormBuilder);
  userService = inject(UsersService);
  private dialog = inject(MatDialog);

  dataSource: User[] = [];
  displayColumns: string[] = ['first_name', 'last_name', 'email', 'actions'];
  selectedUser: any = null;


  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource = users;
    })
  }

  editUser(user: any) {
    this.selectedUser = { ...user }; 
    // Implement edit logic
  }

  saveUpdate(updatedUser: User) {
    this.userService.updateUser(updatedUser).subscribe(() =>  {
      const idx = this.dataSource.findIndex(u => u.user_id === updatedUser.user_id);
      if (idx !== -1) {
        this.dataSource[idx] = updatedUser;
        this.dataSource = [...this.dataSource];
    }
    this.selectedUser = null;
  })
}

  cancelEdit() {
    this.selectedUser = null;
  }

  deleteUser(user: any) {
    this,this.userService.deleteUser(user.user_id).subscribe(() => {
      this.dataSource = this.dataSource.filter(u => u.user_id !== user.user_id);
      this.dataSource = [...this.dataSource];
    })

  }

  openUser(): void {
    const sprintRef = this.dialog.open(UsersDetailComponent);

    sprintRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
      }
    });
  }
}
