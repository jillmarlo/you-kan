import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule, MatNavList } from '@angular/material/list';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatButtonModule, MatNavList, MatListModule, MatIconModule, MatButtonModule,
    RouterModule, RouterOutlet, RouterLink],
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
