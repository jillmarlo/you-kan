import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule, } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../models/project.model';
import { User } from '../../../user-management/models/user.model';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { NewProjectFormComponent } from '../new-project-form/new-project-form.component';
import { ProjectService } from '../../services/project.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Sprint } from '../../../sprints/models/sprint.model';
import { MatDialog } from '@angular/material/dialog';

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
  private fb = inject(FormBuilder);
  projectService = inject(ProjectService);
  private dialog = inject(MatDialog);

  dataSource: Project[] = [];
  displayedColumns: string[] = ['name', 'actions'];
  selectedProject: any = null;


  ngOnInit(): void {
     this.projectService.getProjects().subscribe((projects) =>
      this.dataSource = projects
     )
  }

  editProject(project: any) {
    this.selectedProject = { ...project };
    // Implement edit logic
  }

  saveProject(updatedProject: any) {
    debugger;
    const index = this.dataSource.findIndex(p => p.project_id === updatedProject.project_id);
    if (index !== -1) {
      this.dataSource[index] = updatedProject;
      this.dataSource = [...this.dataSource]; 
    }
    this.selectedProject = null;
  }

  cancelEdit() {
    this.selectedProject = null;
  }

  //http delete is commented until back end hooked up
  deleteProject(project: any) {
    debugger;
    this.projectService.deleteProject(project.project_id).subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.project_id !== project.project_id);
      this.dataSource = [...this.dataSource];
    })
  }

  addProject() {
    const dialogRef = this.dialog.open(NewProjectFormComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //http request to save project and get id back
        let newProj = { project_id: this.dataSource.length + 1, project_name: result.project_name, creator_user_id: 1 } as Project;
        this.dataSource = [...this.dataSource, newProj];
      }
    });
  }

}
