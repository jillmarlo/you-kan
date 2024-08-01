import { Sprint } from '../../sprints/models/sprint.model';
import { User } from '../../user-management/models/user.model';

export interface Project {
    project_id: number;
    project_name: string;
    creator_user_id: number;
    users?: User[];
    sprints?: Sprint[];
}