import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../models/project.model';
import { User } from '../../../user-management/models/user.model';
import { testProjects } from './project-list';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, NgFor, NgIf, UpperCasePipe, FormsModule, MatTableModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  // Test data - will make http request to fetch projects
  projectService = inject(ProjectService)
  dataSource: Project[] = [];
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'actions'];

  testProjects: Project[] = [
    { id: 1, name: 'Project 1', description: 'this is a descripton', startDate: 'Date', endDate: 'Date' },
    { id: 2, name: 'Project 2', description: 'test', startDate: 'Date', endDate: 'Date' },
    { id: 3, name: 'Project 3', description: 'another description', startDate: 'Date', endDate: 'Date' },
    { id: 4, name: 'Project 4', description: 'proj description', startDate: 'Date', endDate: 'Date' }
  ];

  //when the back end is hooked up this will be a fetch, now using test data
  ngOnInit(): void {
    this.dataSource = this.testProjects;
    // this.projectService.getProjects().subscribe((projects) =>
    //   this.dataSource = projects
    // )
  }

  editProject(project: any) {
    console.log('Edit project', project);
    // Implement edit logic
  }

  //http delete is commented until back end hooked up
  deleteProject(project: any) {
    // this.projectService.delete(project.id).subscribe(() => {
    //   this.dataSource = this.dataSource.filter(p => p.id !== project.id);
    //   this.dataSource = [...this.dataSource];
    // })

    this.dataSource = this.dataSource.filter(p => p.id !== project.id);
    this.dataSource = [...this.dataSource];
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
