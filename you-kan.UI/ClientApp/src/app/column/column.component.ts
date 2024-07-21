import { Component, Input } from '@angular/core';
import { TaskCardComponent } from '../tasks/components/task-card/task-card.component';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [TaskCardComponent, UpperCasePipe],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css'
})
export class ColumnComponent {
  @Input() title!: string;

}
