import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import { endpoints } from '@/variables';
import { Payment } from '@/types/paymentInt';

interface DateParams {
    dateFrom: string;
    dateEnd: string;
}

export const formatNumber = (num: number) => parseFloat(num.toFixed(2));


export const getPaymentForPeriods = createAsyncThunk<Payment[], DateParams, { rejectValue: string }>(
    'payments/getPayment',
    async ({ dateFrom, dateEnd }, { rejectWithValue }) => {
        try {
            const response = await axios.get(endpoints.SalesPayFull(dateFrom, dateEnd));
            const arrPayment = response.data;

            const paymentArray: Payment[] = [];

            arrPayment.forEach((payment: Payment) => {
                const {
                    journal_id,
                    order_id,
                    bill_id,
                    bill_number,
                    bill_datetime_string,
                    amount_igtf,
                    payform_id,
                    payform_description,
                    delivery_note_number,
                    currency_id,
                    currency_description,
                    amount_base_currency,
                    amount_alternative_currency,
                    payments_tips_base_currency,
                    amount_tips_alternative_currency,
                    payments_tips_alternative_currency
                } = payment;

                let existingPayment = paymentArray.find(p =>
                    p.payform_description === payform_description &&
                    p.bill_datetime_string === bill_datetime_string
                );

                if (existingPayment) {
                    existingPayment.amount_igtf = formatNumber(existingPayment.amount_igtf + amount_igtf);
                    existingPayment.amount_base_currency = formatNumber(existingPayment.amount_base_currency + amount_base_currency);
                    existingPayment.amount_alternative_currency = formatNumber(existingPayment.amount_alternative_currency + amount_alternative_currency);
                    existingPayment.payments_tips_base_currency = formatNumber(existingPayment.payments_tips_base_currency + payments_tips_base_currency);
                    existingPayment.amount_tips_alternative_currency = formatNumber(existingPayment.amount_tips_alternative_currency + amount_tips_alternative_currency);
                    existingPayment.payments_tips_alternative_currency = formatNumber(existingPayment.payments_tips_alternative_currency + payments_tips_alternative_currency);
                } else {
                    const newPayment: Payment = {
                        payform_description,
                        amount_igtf: formatNumber(amount_igtf),
                        amount_base_currency: formatNumber(amount_base_currency),
                        amount_alternative_currency: formatNumber(amount_alternative_currency),
                        payments_tips_base_currency: formatNumber(payments_tips_base_currency),
                        amount_tips_alternative_currency: formatNumber(amount_tips_alternative_currency),
                        payments_tips_alternative_currency: formatNumber(payments_tips_alternative_currency),
                        journal_id: journal_id,
                        order_id: order_id,
                        bill_id: bill_id,
                        bill_number: bill_number,
                        bill_datetime_string: bill_datetime_string,
                        payform_id: payform_id,
                        delivery_note_number: delivery_note_number,
                        currency_id: currency_id,
                        currency_description: currency_description
                    };
                    paymentArray.push(newPayment);
                }
            });

            return paymentArray;

        } catch (error) {
            enqueueSnackbar('Error en la petición a la API', { variant: 'error' });
            return rejectWithValue('No se pudieron obtener los pagos.');
        }
    }
);
