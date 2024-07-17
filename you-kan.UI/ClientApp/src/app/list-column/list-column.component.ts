import { Component } from '@angular/core';
import { TaskCardComponent } from '../tasks/components/task-card/task-card.component';

@Component({
  selector: 'app-list-column',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './list-column.component.html',
  styleUrl: './list-column.component.css'
})
export class ListColumnComponent {

}
