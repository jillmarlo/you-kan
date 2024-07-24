import { User } from "../../user-management/models/user.model";

export interface Task {
    id: number;
    name: string;
    type: string;
    priority: string;
    description: string | null;
    status: string;
    assigneeId: number;
    creatorId: number;
    effort: number;
}