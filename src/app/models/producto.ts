import { ICategory } from "./categoria";

export interface IProducto {
    id_product: number;
    name_product: string;
    description_pro: string;
    suplier: string;
    category: ICategory;
}
