import { User } from "../../user-management/models/user.model";

export interface Comment {
    user: User;
    text: string;
}