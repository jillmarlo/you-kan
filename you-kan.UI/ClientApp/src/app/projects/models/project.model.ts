import { User } from '../../user-management/models/user.model';

export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: string | Date;
    endDate: string | Date;
}