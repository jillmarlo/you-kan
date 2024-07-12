import { Task } from "../../tasks/models/task.model";

export interface Sprint {
    name: string;
    id: number;
    startDate: string | Date;
    endDate: string | Date;
    tasks: Task[];
    storyPoints: number;
}