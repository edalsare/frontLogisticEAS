import { IProducto } from "./producto";
import { IUsers } from "./users.model";

export interface IFactura {
    idbill: number;
    numbill: string;
    datebill: Date;
    lagency:string;
    actives: boolean;
    users: IUsers;
    product: IProducto[];
}
