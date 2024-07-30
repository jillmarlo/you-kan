import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../models/project.model';
import { User } from '../../../user-management/models/user.model';
import { FormsModule } from '@angular/forms';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { ProjectService } from '../../services/project.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, NgFor, NgIf, UpperCasePipe,
    ProjectDetailComponent, FormsModule, MatTableModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  animations: [
    trigger('detailExpand', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class ProjectListComponent implements OnInit {
  // Test data - will make http request to fetch projects
  projectService = inject(ProjectService)
  dataSource: Project[] = [];
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'actions'];
  selectedProject: any = null;

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
    this.selectedProject = { ...project };
    // Implement edit logic
  }

  saveProject(updatedProject: any) {
    const index = this.dataSource.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      this.dataSource[index] = updatedProject;
      this.dataSource = [...this.dataSource]; // Trigger change detection
    }
    this.selectedProject = null;
  }

  cancelEdit() {
    this.selectedProject = null;
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

}
