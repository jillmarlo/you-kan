import { User } from "./user.model"
import { Card } from "../../tasks/models/task.model";

export interface UserCard {
    user_id: User; 
    card_id: Card; 
}