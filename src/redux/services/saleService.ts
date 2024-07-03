import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Ticket } from '@/types/ticket'
import { endpoints } from '@/variables';


interface DateParams {
    dateFrom: string;
    dateEnd: string;
}

interface Product {
    producto: string;
    cantidad: number;
    familia: string;
    tipo: string;
}

interface Factura {
    factura: number,
    orden: number,
    sub_total_Factura: number,
    total_Factura: number,
    nombre_cliente: string,
    cedula_cliente: string,
    fecha: string,
    total_productos: Product[],
    servicio: number,
    porcentaje_impuesto: number,
    total_impuesto: number,
    total_compra: number,
}
interface ResponseTicketsForPeriods {
    totalSales: number,
    totalService: number,
    totalTaxes: number

}

export const getTicketsForPeriods = createAsyncThunk<ResponseTicketsForPeriods, DateParams, { rejectValue: string }>(
    'tickets/getTickets',
    async ({ dateFrom, dateEnd }, { rejectWithValue }) => {
        try {

            const response = await axios.get(endpoints.salesFull(dateFrom, dateEnd));

            const arrTickets = response.data;

            console.log("tengo arrayTickets : ", arrTickets);


            const salesArray: Factura[] = [];

            arrTickets.forEach((ticket: any) => {
                if (ticket.status === 'Cancelada') {
                    return;
                }
                const {
                    bill_id,
                    order_id,
                    subtotal,
                    total,
                    customer_name,
                    customer_identification,
                    bill_datetime_string,
                    product_name,
                    quantity,
                    family_name,
                    product_type_name,
                    service_value,
                    tax_percentage,
                    tax_value,
                } = ticket;

                let existingInvoice = salesArray.find((invoice) => invoice.orden === order_id);

                if (existingInvoice) {
                    existingInvoice.total_productos.push({
                        producto: product_name,
                        cantidad: quantity,
                        familia: family_name,
                        tipo: product_type_name,
                    });

                } else {
                    const newInvoice: Factura = {
                        factura: bill_id,
                        orden: order_id,
                        sub_total_Factura: subtotal,
                        total_Factura: total,
                        nombre_cliente: customer_name,
                        cedula_cliente: customer_identification,
                        fecha: bill_datetime_string,
                        total_productos: [{
                            producto: product_name,
                            cantidad: quantity,
                            familia: family_name,
                            tipo: product_type_name,
                        }],
                        servicio: service_value,
                        porcentaje_impuesto: tax_percentage,
                        total_impuesto: tax_value,
                        total_compra: total,
                    };

                    salesArray.push(newInvoice);
                }
            });

            const totalSales = parseFloat(salesArray.reduce((total: number, ticket: Factura) => total + ticket.total_Factura, 0).toFixed(2));
            const totalService = parseFloat(salesArray.reduce((total: number, ticket: Factura) => total + ticket.servicio, 0).toFixed(2));
            const totalTaxes = parseFloat(salesArray.reduce((total: number, ticket: Factura) => total + ticket.total_impuesto, 0).toFixed(2));


            console.log("esto hice: ", salesArray);

            return {
                totalSales: totalSales,
                totalService: totalService,
                totalTaxes: totalTaxes
            };
        } catch (error) {
            console.error("ERROR:", error)
            return rejectWithValue('No se pudieron obtener los tickets.');
        }
    }
);