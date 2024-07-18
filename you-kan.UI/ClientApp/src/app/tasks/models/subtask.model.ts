import { Task } from "./task.model";

export interface Subtask {
    subtask_id: number;
    subtask_description: string;
    task_id: Task;
}