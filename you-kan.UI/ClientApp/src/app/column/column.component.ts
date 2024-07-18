import { Component } from '@angular/core';
import { TaskCardComponent } from '../tasks/components/task-card/task-card.component';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css'
})
export class ColumnComponent {

}
