import { IFactura } from "./factura";
import { IProducto } from "./producto";

export interface ICantidadIn {
    id_amount_in: number;
    cantin: number;
    bill: IFactura;
    product2: IProducto;
}
