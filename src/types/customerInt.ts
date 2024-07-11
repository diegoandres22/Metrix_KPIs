import { Consumos } from "./consumosInt"


export interface Customers {
    id: number,
    nombre: string,
    numero_de_telefono: string,
    numero_de_cedula: number,
    direccion: string,
    total_visitas: number,
    consumos: Consumos[],
    consumo_total_USD: number,
    consumo_total_BS: number,
    
}