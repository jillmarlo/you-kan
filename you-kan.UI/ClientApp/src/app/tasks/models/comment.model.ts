import { User } from "../../user-management/models/user.model";
import { Task } from "./task.model";

export interface Comment {
    comment_id: number;
    task_id: Task;
    comment_text: string;
    created_at: string | Date;
    user_id: User;
}