
import { Product } from "./productInt";


export interface Factura {

    factura: number,
    orden: number,

    total_factura: number,
    sub_total_factura: number,
    neto_factura: number,
    impuesto_factura: number,

    nombre_cliente: string,
    cedula_cliente: string,
    fecha: string,
    total_productos: Product[],
    servicio: number,
    porcentaje_impuesto: number,

    numero_cliente: number,
    direccion_cliente: string

    estado: string
}