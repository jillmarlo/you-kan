export interface Sprint {
    sprint_id: number;
    sprint_name: string;
    project_id: number;
    startDate: string | Date;
    endDate: string | Date;
}