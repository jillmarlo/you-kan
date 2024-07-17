<<<<<<< HEAD
import { Sprint } from "../../sprints/models/sprint.model";
import { Card } from "./task.model";
=======
import { User } from "../../user-management/models/user.model";
>>>>>>> 47ff2e9ac949c3a57392e4a037bbe27f3ba38a1a

export interface Comment {
    comment_id: number;
    card_title: string;
    card_id: Card;
    sprint_id: Sprint;
    created_at: string | Date;
}