import { User } from '../../user-management/models/user.model';

export interface Boards {
    board_id: number;
    board_name: string;
    board_color_scheme: string;
    user_id: User;
    created_at: string | Date;
}