import { Producto_compras } from "./producto_comprasInt";

export interface Factura_compras {
    id: number,
    factura_num: string,
    factura_emision: string,
    factura_carga: string,
    proveedor_id: number,
    proveedor_nombre: string,
    proveedor_rif: string,
    subtotal_factura: number,
    neto_factura: number,
    total_factura: number,
    moneda: string,
    tasa_dia: number,
    productos: Producto_compras[],
    
}