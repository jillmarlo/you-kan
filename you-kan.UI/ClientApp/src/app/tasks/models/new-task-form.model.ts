export interface NewTaskForm {
    name: string;
    description: string,
    type: string;
    priority: string;
    assigneeId: number | null;
    status: string;
    effort: number | null;
}