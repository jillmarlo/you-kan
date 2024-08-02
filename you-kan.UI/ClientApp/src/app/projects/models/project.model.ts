import { Sprint } from '../../sprints/models/sprint.model';
import { User } from '../../user-management/models/user.model';

export interface Project {
    project_id: number;
    project_name: string;
    users?: User[];
    sprints?: Sprint[];
}