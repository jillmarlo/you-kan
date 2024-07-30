import { User } from "../../user-management/models/user.model";
import { Task } from "./task.model";

export interface Comment {
    comment_id: number;
    task_id: number;
    comment_text: string;
    user_id: number;
}