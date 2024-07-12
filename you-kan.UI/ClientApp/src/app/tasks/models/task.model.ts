import { Priority } from "./priority.enum";
import { TaskStatus } from "./task-status.enum";
import { TaskType } from "./task-type.enum";
import { Comment } from "./comment.model";

export interface Task {
    name: string;
    type: TaskType;
    priority: Priority;
    description: string;
    status: TaskStatus;
    assignee: User;
    creator: User;
    comments: Comment[];
    effort: number;
}