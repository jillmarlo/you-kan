import { Users } from "./user.model"
import { Cards } from "../../tasks/models/task.model";

export interface UserCard {
    user_id: number; // | Users['user_id'];
    card_id: number; // | Cards['card_id'];
}