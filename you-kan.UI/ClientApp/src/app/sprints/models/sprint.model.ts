export interface Sprint {
    sprint_id?: number;
    sprint_name: string;
    project_id: number;
    start_date: string | Date;
    end_date: string | Date;
}