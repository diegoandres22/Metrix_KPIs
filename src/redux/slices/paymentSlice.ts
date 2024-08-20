import { createSlice } from '@reduxjs/toolkit';
import { getPaymentForPeriods } from '../services/paymentService';
import { Payment } from '@/types/paymentInt';

interface PaymentState {
    paymentSummary: Payment[];
    loading: boolean;
    error: string | null | undefined | unknown;
}

const initialState: PaymentState = {
    paymentSummary: [],
    loading: false,
    error: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        removePaymentsForPeriods(state) {
            state.paymentSummary = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentForPeriods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPaymentForPeriods.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentSummary = action.payload;
            })
            .addCase(getPaymentForPeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { removePaymentsForPeriods } = paymentSlice.actions;


export default paymentSlice.reducer;
