export interface NewTaskForm {
    name: string;
    description: string,
    type: string;
    priority: string;
    assignee: number | null;
    status: string;
    effort: number | null;
}