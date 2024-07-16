import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { endpoints } from '@/variables';
import { enqueueSnackbar } from 'notistack';
import { Factura } from '@/types/factureInt';


interface DateParams {
    dateFrom: string;
    dateEnd: string;
}


interface ResponseTicketsForPeriods {
    totalSales: number,
    totalService: number,
    totalTaxes: number,
    subTotal: number

}
interface AllTickets {
    month: string,
    total: number
}


export const formatNumber = (num: number) => parseFloat(num.toFixed(2));

export const getTicketsForPeriods = createAsyncThunk<ResponseTicketsForPeriods, DateParams, { rejectValue: string }>(
    'tickets/getTickets',
    async ({ dateFrom, dateEnd }, { rejectWithValue }) => {
        try {

            const response = await axios.get(endpoints.salesFull(dateFrom, dateEnd));

            const arrTickets = response.data;

            const salesArray: Factura[] = [];

            arrTickets.forEach((ticket: any) => {
                if (ticket.status === 'Cancelada') {
                    return;
                }
                if (ticket.status !== 'Cancelada' && ticket.status !== 'Cerrada') {
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
                    product_total,
                    product_net_price,
                    product_subtotal,
                    product_tax_value,
                    net_price,
                    customer_address,
                    customer_phone,
                    status,
                    product_code
                } = ticket;


                let existingInvoice = salesArray.find((invoice) => invoice.orden === order_id);

                if (existingInvoice) {
                    existingInvoice.total_productos.push({
                        producto: product_name,
                        cantidad: quantity,
                        familia: family_name,
                        tipo: product_type_name,
                        neto_producto: product_net_price,
                        codigo: product_code,

                        total_producto: product_total,
                        sub_total_producto: product_subtotal,
                        impuesto_producto: product_tax_value,
                    });

                } else {
                    const newInvoice: Factura = {
                        factura: bill_id,
                        orden: order_id,

                        sub_total_factura: subtotal,
                        total_factura: formatNumber(total),
                        impuesto_factura: formatNumber(tax_value),
                        neto_factura: formatNumber(net_price),
                        direccion_cliente: customer_address,
                        numero_cliente: customer_phone,
                        nombre_cliente: customer_name,
                        cedula_cliente: customer_identification,
                        fecha: bill_datetime_string,
                        total_productos: [{
                            producto: product_name,
                            cantidad: quantity,
                            familia: family_name,
                            tipo: product_type_name,
                            neto_producto: product_net_price,
                            codigo: product_code,
                            total_producto: product_total,
                            sub_total_producto: product_subtotal,
                            impuesto_producto: product_tax_value,
                        }],
                        servicio: formatNumber(service_value),
                        porcentaje_impuesto: tax_percentage,
                        estado: status
                    };

                    salesArray.push(newInvoice);
                }
            });

            const totalSales = parseFloat(salesArray.reduce((total: number, ticket: Factura) => total + ticket.total_factura, 0).toFixed(2));
            const totalService = parseFloat(salesArray.reduce((total: number, ticket: Factura) => total + ticket.servicio, 0).toFixed(2));
            const totalTaxes = parseFloat(salesArray.reduce((total: number, ticket: Factura) => total + ticket.impuesto_factura, 0).toFixed(2));
            const totalVentaNeta = parseFloat(salesArray.reduce((total: number, ticket: Factura) => total + ticket.neto_factura, 0).toFixed(2));

            return {
                totalSales: totalSales,
                totalService: totalService,
                totalTaxes: totalTaxes,
                subTotal: totalVentaNeta,
            };
        } catch (error) {
            console.log(error);

            enqueueSnackbar('Error en la petición a la API', { variant: 'error' });
            return rejectWithValue('No se pudieron obtener los tickets.');
        }
    }
);
export const getFacturesForPeriods = createAsyncThunk<Factura[], DateParams, { rejectValue: string }>(
    'tickets/getFactures',
    async ({ dateFrom, dateEnd }, { rejectWithValue }) => {
        try {

            const response = await axios.get(endpoints.salesFull(dateFrom, dateEnd));

            const arrTickets = response.data;

            const salesArray: Factura[] = [];

            arrTickets.forEach((ticket: any) => {

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
                    product_total,
                    product_net_price,
                    product_subtotal,
                    product_tax_value,
                    net_price,
                    customer_phone,
                    customer_address,
                    status,
                    product_code,
                } = ticket;

                let existingInvoice = salesArray.find((invoice) => invoice.orden === order_id);

                if (existingInvoice) {
                    existingInvoice.total_productos.push({
                        producto: product_name,
                        cantidad: quantity,
                        familia: family_name,
                        tipo: product_type_name,
                        neto_producto: product_net_price,
                        codigo: product_code,

                        total_producto: product_total,
                        sub_total_producto: product_subtotal,
                        impuesto_producto: product_tax_value,
                    });

                } else {
                    const newInvoice: Factura = {
                        factura: bill_id,
                        orden: order_id,

                        sub_total_factura: subtotal,
                        total_factura: formatNumber(total),
                        impuesto_factura: formatNumber(tax_value),
                        neto_factura: formatNumber(net_price),
                        direccion_cliente: customer_address,
                        numero_cliente: customer_phone,
                        nombre_cliente: customer_name,
                        cedula_cliente: customer_identification,
                        fecha: bill_datetime_string,
                        total_productos: [{
                            producto: product_name,
                            cantidad: quantity,
                            familia: family_name,
                            tipo: product_type_name,
                            neto_producto: product_net_price,
                            codigo: product_code,
                            total_producto: product_total,
                            sub_total_producto: product_subtotal,
                            impuesto_producto: product_tax_value,
                        }],
                        servicio: formatNumber(service_value),
                        porcentaje_impuesto: tax_percentage,
                        estado: status
                    };

                    salesArray.push(newInvoice);
                }
            });

            return salesArray;

        } catch (error) {

            enqueueSnackbar('Error en la petición a la API', { variant: 'error' });
            return rejectWithValue('No se pudieron obtener las facturas.');
        }
    }
);



export const getAllTickets = createAsyncThunk<AllTickets[], DateParams, { rejectValue: string }>(
    'tickets/getAllTickets',
    async ({ dateFrom, dateEnd }, { rejectWithValue }) => {
        try {

            const response = await axios.get(endpoints.salesFull(dateFrom, dateEnd));

            const arrTickets = response.data;

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
                    product_total,
                    product_net_price,
                    product_subtotal,
                    product_tax_value,
                    net_price,
                    customer_address,
                    customer_phone,
                    status,
                    product_code
                } = ticket;




            });


            return [{
                month: 'null',
                total: 1
            }]
        } catch (error) {
            console.log(error);

            enqueueSnackbar('Error en la petición a la API', { variant: 'error' });
            return rejectWithValue('No se pudieron obtener los tickets.');
        }
    }
);