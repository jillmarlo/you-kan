import { Sprint } from "../../sprints/models/sprint.model";
import { Card } from "./task.model";

export interface Comment {
    comment_id: number;
    card_title: string;
    card_id: Card;
    sprint_id: Sprint;
    created_at: string | Date;
}