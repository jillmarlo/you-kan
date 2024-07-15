import { Priority } from "./priority.enum";
import { TaskStatus } from "./task-status.enum";
import { TaskType } from "./task-type.enum";
import { Comment } from "./comment.model";
import { Users } from "../../user-management/models/user.model";
import { Sprint } from "../../sprints/models/sprint.model";

export interface Cards {
    card_id: number;
    card_title: string;
    card_description: string;
    list_id: number;
    sprint_id: Sprint;
    due_date: string | Date;
    card_color_cover: string;
    member: Users | null;
    created_at: string | Date;
}