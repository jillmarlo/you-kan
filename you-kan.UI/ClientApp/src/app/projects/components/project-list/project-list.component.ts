import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../models/project.model';
import { User } from '../../../user-management/models/user.model';
import { testProjects } from './project-list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, NgFor, NgIf, UpperCasePipe, FormsModule, MatTableModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  // Test data - will make http request to fetch projects
  dataSource = testProjects;
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'actions'];

  editProject(project: any) {
    console.log('Edit project', project);
    // Implement edit logic
  }

  deleteProject(project: any) {
    console.log('Delete project', project);
    // Implement delete logic
  }

  addProject() {
    
  }

 //projects = project;
// selectedproject?: Project;

// onSelect(project: Project): void {
//   this.selectedproject = project;
// }
// 
}
