import { User } from "./user.model";
import { Boards } from "../../sprints/models/boards.model";

export interface UserBoards {
    user_id: User;
    board_id: Boards;
    role: string;
}