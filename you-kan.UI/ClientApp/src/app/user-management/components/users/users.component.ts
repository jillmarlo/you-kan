import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-component',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  userData: User[] = [
    {user_id: 1, first_name: 'John', last_name: 'Smith', email: 'jsmith@test.com', password_hash: 'testing123', created_at: 'Date here'}, 
    { user_id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jdoe@test.com', password_hash: 'testing456', created_at: 'Date here'},
    { user_id: 3, first_name: 'Hannibal', last_name: 'Lecter', email: 'hlecter@test.com', password_hash: 'wgraham123', created_at: 'Date here'}
  ];

  displayedColumns: string[] = ['user_id', 'first_name', 'last_name', 'email', 'password_hash', 'created_at'];
  dataSource = this.userData;
  clickedRows = new Set<User>();
}
