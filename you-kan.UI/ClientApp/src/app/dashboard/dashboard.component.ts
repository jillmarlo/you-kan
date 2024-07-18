import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'
import { ColumnComponent } from '../column/column.component';
import { TaskCardComponent } from '../tasks/components/task-card/task-card.component';
import { DashboardActionBarComponent } from "../dashboard-action-bar/dashboard-action-bar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, ColumnComponent, TaskCardComponent, DashboardActionBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
