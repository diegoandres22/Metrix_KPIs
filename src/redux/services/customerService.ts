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

            arrTickets.forEach((ticket: Ticket2) => {

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
                    product_code
                } = ticket;


                let existingInvoice = customersArray.find((invoice) => invoice.numero_de_cedula === customer_identification);

                if (existingInvoice) {

                    const isOrderExists = existingInvoice.consumos.some(consumo => consumo.fecha === bill_datetime_string);

                    if (!isOrderExists) {
                        existingInvoice.total_visitas += 1;
                    }
                    if (status !== "Cancelada") {
                        existingInvoice.consumo_total_USD = formatNumber(existingInvoice.consumo_total_USD + product_total * quantity);
                    }

                    existingInvoice.consumos.push({
                        producto: product_name,
                        fecha: bill_datetime_string,
                        cantidad: quantity,
                        numero_orden: order_id,
                        estado: status,
                        precio: formatNumber(product_total),
                        tasa: exchange_date_day,
                        producto_id: product_code
                    });

                } else {
                    const newInvoice: Customers = {
                        id: customer_id,
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
                            precio: formatNumber(product_total),
                            tasa: exchange_date_day,
                            producto_id: product_code
                        }],
                        consumo_total_USD: formatNumber(product_total),
                        consumo_total_BS: 0
                    };

                    customersArray.push(newInvoice);
                }

            });
            // console.log("mandé :  ", customersArray);

            return customersArray;

        } catch (error) {

            enqueueSnackbar('Error en la petición a la API', { variant: 'error' });
            return rejectWithValue('No se pudieron obtener las facturas.');
        }
    })
