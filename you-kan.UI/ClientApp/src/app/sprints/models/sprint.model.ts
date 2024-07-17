import { Project } from '../../projects/models/project.model';

export interface Sprint {
    sprint_id: number;
    sprint_name: string;
    project_id: Project;
    startDate: string | Date;
    endDate: string | Date;
    created_at: string | Date;
}