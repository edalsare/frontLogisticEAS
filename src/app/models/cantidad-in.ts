import { IFactura } from "./factura";
import { IProducto } from "./producto";

export interface ICantidadIn {
    id_amount_in: number;
    cantin: number;
    bill: IFactura;
    product2: IProducto;
}

export interface Icantidades{
    Icantidad: ICantidadIn;
    unidades: number;
    cajas: number;
    pallets: number;
    cantidadf: number;
}