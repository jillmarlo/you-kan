
export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password_hash?: string;
    created_at?: string | Date;
}