import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule, } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../models/project.model';
import { User } from '../../../user-management/models/user.model';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { ProjectService } from '../../services/project.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Sprint } from '../../../sprints/models/sprint.model';

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
  private fb = inject(FormBuilder);
  projectService = inject(ProjectService);
  dataSource: Project[] = [];
  displayedColumns: string[] = ['name', 'actions'];
  selectedProject: any = null;

  sprintsProject1: Sprint[] = [
    { sprint_id: 1, sprint_name: 'Gather requirements', project_id: 1, start_date: new Date(2024, 6, 1), end_date: new Date(2024, 6, 12) },
    { sprint_id: 2, sprint_name: 'Project diagrams', project_id: 1, start_date: new Date(2024, 6, 15), end_date: new Date(2024, 6, 26) },
  ];

  sprintsProject2: Sprint[] = [
    { sprint_id: 3, sprint_name: 'Spec docs', project_id: 2, start_date: new Date(2024, 6, 1), end_date: new Date(2024, 6, 12) },
    { sprint_id: 4, sprint_name: 'Research tech stack', project_id: 2, start_date: new Date(2024, 6, 15), end_date: new Date(2024, 6, 26) },
  ];

  usersProject1: User[] = [ { user_id: 1, first_name: 'John', last_name: 'Smith', email: 'jsmith@test.com', password_hash: 'testing123', created_at: 'Date here' }]

  testProjects: Project[] = [
    { project_id: 1, project_name: 'Project 1', creator_user_id: 1, sprints: this.sprintsProject1, users: this.usersProject1 },
    { project_id: 2, project_name: 'Project 2', creator_user_id: 1, sprints: this.sprintsProject2 },
    { project_id: 3, project_name: 'Project 3', creator_user_id: 1 },
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
    const index = this.dataSource.findIndex(p => p.project_id === updatedProject.project_id);
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

    this.dataSource = this.dataSource.filter(p => p.project_id !== project.project_id);
    this.dataSource = [...this.dataSource];
  }

  addProject() {

  }

}
