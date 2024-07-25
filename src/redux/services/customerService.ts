import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import { endpoints } from '@/variables';
import { Customers } from '@/types/customerInt'
import { Ticket2 } from '@/types/ticket';


interface DateParams {
    dateFrom: string;
    dateEnd: string;
}

export const formatNumber = (num: number) => parseFloat(num.toFixed(2));

export const getCustomersForPeriods = createAsyncThunk<Customers[], DateParams, { rejectValue: string }>(
    'tickets/getCustomers',
    async ({ dateFrom, dateEnd }, { rejectWithValue }) => {
        try {
            const response = await axios.get(endpoints.salesFull(dateFrom, dateEnd));

            const arrTickets = response.data;

            const customersArray: Customers[] = [];

            arrTickets.forEach((customer: Ticket2) => {

                const {
                    order_id,
                    product_name,
                    bill_datetime_string,
                    customer_identification,
                    quantity,
                    status,
                    customer_name,
                    customer_address,
                    customer_phone,
                    customer_id,
                    exchange_date_day,
                    product_total,
                    product_code,
                    product_sale_price,
                    product_subtotal,
                    product_tax_value,
                    service_value,
                    total
                } = customer;


                let existingInvoice = customersArray.find((invoice) => invoice.numero_de_cedula === customer_identification);

                if (existingInvoice) {

                    const isOrderExists = existingInvoice.consumos.some(consumo => consumo.fecha === bill_datetime_string);

                    if (!isOrderExists) {
                        existingInvoice.total_visitas += 1;
                    }
                    const isOrderDuplicate = existingInvoice.consumos.some(consumo => consumo.numero_orden === order_id);

                    if (status !== "Cancelada" && !isOrderDuplicate) {

                        existingInvoice.consumo_total_USD += formatNumber(total);
                    }

                    existingInvoice.consumos.push({
                        producto: product_name,
                        fecha: bill_datetime_string,
                        cantidad: quantity,
                        numero_orden: order_id,
                        estado: status,
                        precio: formatNumber(product_sale_price),
                        tasa: exchange_date_day,
                        producto_id: product_code,
                        sub_total: formatNumber(product_subtotal),
                        impuesto: formatNumber(product_tax_value),
                        total_producto: formatNumber(product_total)
                    });

                } else {
                    const newInvoice: Customers = {
                        cliente_id: customer_id,
                        nombre: customer_name,
                        numero_de_telefono: customer_phone,
                        numero_de_cedula: customer_identification,
                        direccion: customer_address,
                        total_visitas: 1,
                        consumos: [{
                            producto: product_name,
                            fecha: bill_datetime_string,
                            cantidad: quantity,
                            numero_orden: order_id,
                            estado: status,
                            precio: formatNumber(product_sale_price),
                            tasa: exchange_date_day,
                            producto_id: product_code,
                            sub_total: formatNumber(product_subtotal),
                            impuesto: formatNumber(product_tax_value),
                            total_producto: formatNumber(product_total)
                        }],
                        consumo_total_USD: formatNumber(total),
                        consumo_total_BS: 0,
                        servicio: service_value,
                    };

                    customersArray.push(newInvoice);
                }

            });



            return customersArray;

        } catch (error) {

            enqueueSnackbar('Error en la petición a la API', { variant: 'error' });
            return rejectWithValue('No se pudieron obtener las facturas.');
        }
    })
