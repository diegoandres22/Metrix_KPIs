import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import { endpoints } from '@/variables';
import { Purchase } from '@/types/purchaseInt';
import { Factura_compras } from '@/types/factura_compraInt';


interface DateParams {
    dateFrom: string;
    dateEnd: string;
}

export const formatNumber = (num: number) => parseFloat(num.toFixed(2));

export const getPurchasesForPeriods = createAsyncThunk<Factura_compras[], DateParams, { rejectValue: string }>(
    'tickets/getPurchase',
    async ({ dateFrom, dateEnd }, { rejectWithValue }) => {
        try {
            const response = await axios.get(endpoints.purchaseFull(dateFrom, dateEnd));

            const arrPurchases = response.data;

            const purchasesArray: Factura_compras[] = [];

            arrPurchases.forEach((purchase: Purchase) => {

                const {
                    header_id,
                    number_document,
                    date_document_string,
                    date_reception_string,
                    supplier_id,
                    supplier_name,
                    supplier_rif,
                    sub_total_bill,
                    net_bill,
                    total_bill,
                    currency_name,
                    item_id,
                    product_name,
                    product_quantity,
                    product_cost_unit,
                    product_cost_total,
                    item_net_price,
                    exchange_date_day,
                } = purchase;

                let existingInvoice = purchasesArray.find((invoice) => invoice.factura_num === number_document);

                if (existingInvoice) {

                    existingInvoice.productos.push({
                        producto_id: item_id,
                        producto_nombre: product_name,
                        producto_cantidad: product_quantity,
                        producto_unidad: formatNumber(product_cost_unit),
                        producto_total: formatNumber(product_cost_total),
                        precio_neto_producto: formatNumber(item_net_price),
                    });

                } else {
                    const newInvoice: Factura_compras = {
                        id: header_id,
                        factura_num: number_document,
                        factura_emision: date_document_string,
                        factura_carga: date_reception_string,
                        proveedor_id: supplier_id,
                        proveedor_nombre: supplier_name,
                        proveedor_rif: supplier_rif,
                        subtotal_factura: sub_total_bill,
                        neto_factura: net_bill,
                        total_factura: total_bill,
                        moneda: currency_name,
                        tasa_dia: exchange_date_day,
                        productos: [{
                            producto_id: item_id,
                            producto_nombre: product_name,
                            producto_cantidad: product_quantity,
                            producto_unidad:formatNumber(product_cost_unit),
                            producto_total: formatNumber(product_cost_total),
                            precio_neto_producto: formatNumber(item_net_price),
                        }]
                    };

                    purchasesArray.push(newInvoice);
                }

            });

            return purchasesArray;

        } catch (error) {

            enqueueSnackbar('Error en la petición a la API', { variant: 'error' });
            return rejectWithValue('No se pudieron obtener las facturas.');
        }
    })
