import { People } from "./people.model";
export interface IUsers {
    id_users: number;
    nameuser: string;
    password: string;
    post:     string;
    people:   People;
}


