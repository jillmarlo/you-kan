import { Priority } from "./priority.enum";
import { TaskStatus } from "./task-status.enum";
import { TaskType } from "./task-type.enum";
import { Comment } from "./comment.model";
import { User } from "../../user-management/models/user.model";
import { Sprint } from "../../sprints/models/sprint.model";
import { Lists } from "./lists.model";

export interface Card {
    card_id: number;
    card_title: string;
    card_description: string;
    list_id: Lists;
    sprint_id: Sprint;
    due_date: string | Date;
    card_color_cover: string;
    member: User | null;
    created_at: string | Date;
}