import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { FormBuilder } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-users-component',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgFor, NgIf, UpperCasePipe, UserDetailComponent ],
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
  userService = inject(UserService);

  dataSource: User[] = [];
  displayColumns: string[] = ['first_name', 'last_name', 'email', 'actions'];
  selectedUser: any = null;

  // replace with endpoint
  // only display name &  email from sqlquery - test data has full info
  userTestData: User[] = [
    {user_id: 1, first_name: 'John', last_name: 'Smith', email: 'jsmith@test.com', password_hash: 'testing123', created_at: 'Date here'}, 
    { user_id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jdoe@test.com', password_hash: 'testing456', created_at: 'Date here'},
    { user_id: 3, first_name: 'Hannibal', last_name: 'Lecter', email: 'hlecter@test.com', password_hash: 'wgraham123', created_at: 'Date here'}
  ];

  ngOnInit(): void {
      this.dataSource = this.userTestData;
  }

  editUser(user: any) {
    this.selectedUser = { ...user }; 
    // Implement edit logic
  }

  saveUpdate(updatedUser: any) {
    debugger;
    const idx = this.dataSource.findIndex(u => u.user_id === updatedUser.user_id);
    if (idx !== -1) {
      this.dataSource[idx] = updatedUser;
      this.dataSource = [...this.dataSource];
    }
    this.selectedUser = null;
  }

  cancelEdit() {
    this.selectedUser = null;
  }

  deleteUser(user: any) {
    this.dataSource = this.dataSource.filter(u => u.user_id !== user.user_id);
    this.dataSource = [...this.dataSource];
    // Implement delete logic
  }
}
