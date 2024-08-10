import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MaterialModule } from '../shared/material.module'
import { AuthService } from '../user-management/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, RouterModule, RouterOutlet, RouterLink, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  isLoggedIn: boolean=false;

  constructor(private authService: AuthService, private router: Router) {
    authService.isLoggedIn.subscribe(newValue => {this.isLoggedIn = newValue}) // tells dashboard we are logged in
  }

  logout() {
    this.authService.logout().subscribe(
      response => {
        console.log('Logout successful', response);
        this.authService.isLoggedIn.next(false);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Logout error', error);
      }
    );
  }

  openUserDetail() {
    // implement here
  }
}
