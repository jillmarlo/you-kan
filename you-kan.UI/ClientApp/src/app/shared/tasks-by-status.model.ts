import { Task } from "../tasks/models/task.model";

export interface TaskByStatus {
    status: string,
    tasks: Task[];
}