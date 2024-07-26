import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Project } from '../../models/project.model';
import { User } from '../../../user-management/models/user.model';
import { project } from './project-list';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, UpperCasePipe, FormsModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
projects = project;
selectedproject?: Project;

onSelect(project: Project): void {
  this.selectedproject = project;
}
}
