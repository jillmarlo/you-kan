import { User } from "./user.model"
import { Task } from "../../tasks/models/task.model";

export interface TaskAssignee {
    user_id: User; 
    card_id: Task; 
}