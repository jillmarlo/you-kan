import { Component } from '@angular/core';
import { MaterialModule } from '../shared/material.module'
import { RouterOutlet, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../user-management/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, RouterModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe(
      response => {
        console.log('Logout successful', response);
        this.router.navigate(['/login']);
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
