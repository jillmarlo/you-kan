import { User } from "./user.model";
import { Project } from "../../projects/models/project.model";

export interface ProjectUser {
    user_id: User;
    project_id: Project;
}