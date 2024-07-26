import { User } from "../../user-management/models/user.model";

export interface Task {
    id: number | null;
    name: string;
    type: string;
    priority: string;
    description: string | null;
    status: string;
    assigneeId: number | null;
    creatorId: number;
    effort: number | null;
    sprintId: number | null;
}