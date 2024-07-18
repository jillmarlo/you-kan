import { User } from '../../user-management/models/user.model';

export interface Projects {
    project_id: number;
    project_name: string;
    created_at: string | Date;
    creator_user_id: User;
}