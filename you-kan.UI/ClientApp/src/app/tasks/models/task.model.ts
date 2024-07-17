import { Priority } from "./priority.enum";
import { TaskStatus } from "./task-status.enum";
import { TaskType } from "./task-type.enum";
import { Comment } from "./comment.model";
import { User } from "../../user-management/models/user.model";
import { Sprint } from "../../sprints/models/sprint.model";
import { Lists } from "./lists.model";

export interface Task {
    name: string;
    type: TaskType;
    priority: Priority;
    description: string;
    status: TaskStatus;
    assignee: User | null;
    creator: User;
    comments: Comment[];
    effort: number;
}