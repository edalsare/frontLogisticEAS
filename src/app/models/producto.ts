import { ICategory } from "./categoria";

export interface IProducto {
    idproduct: number;
    nameproduct: string;
    descriptionpro: string;
    suplier: string;
    category: ICategory;
}
