import { IFactura } from "./factura";
import { IMuelle } from "./muelle";
import { IProducto } from "./producto";

export interface ICantidad {
    id_cant: number;
    cant: number;
    statepier: boolean;
    producta: IProducto;
    pier: IMuelle;
    bill2: IFactura;
}


