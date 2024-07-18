import { Priority } from "./priority.enum";
import { TaskStatus } from "./task-status.enum";
import { TaskType } from "./task-type.enum";
import { Comment } from "./comment.model";
import { User } from "../../user-management/models/user.model";

export interface Task {
    id: number;
    name: string;
    typeId: number;
    priorityId: number;
    description: string | null;
    statusId: number;
    assigneeId: number;
    creatorId: number;
    effort: number;
}