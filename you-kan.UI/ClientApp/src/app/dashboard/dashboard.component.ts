import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'
import { ListColumnComponent } from '../list-column/list-column.component';
import { TaskCardComponent } from '../tasks/components/task-card/task-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, ListColumnComponent, TaskCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
