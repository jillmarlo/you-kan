import { Boards } from "../../sprints/models/boards.model";

export interface Lists {
    list_id: number;
    list_name: string;
    board_id: Boards;
    position: number;
    members: string;
}