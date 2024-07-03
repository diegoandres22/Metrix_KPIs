
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getTicketsForPeriods } from '../services/saleService';

interface SalesState {
    sales: any[];
    loading: boolean;
    error: string | null | undefined | unknown;
    totalSumOfSales: number;
    totalSumOfTaxes: number,
    totalSumOfServices: number
}

const initialState: SalesState = {
    sales: [],
    loading: false,
    error: null,
    totalSumOfSales: 0,
    totalSumOfTaxes: 0,
    totalSumOfServices: 0

};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        fetchSalesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchSalesSuccess(state, action: PayloadAction<any[]>) {
            state.loading = false;
            state.sales = action.payload;
        },
        fetchSalesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTicketsForPeriods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTicketsForPeriods.fulfilled, (state, action) => {
                state.loading = false;
                state.totalSumOfServices = action.payload.totalService;
                state.totalSumOfSales = action.payload.totalSales;
                state.totalSumOfTaxes = action.payload.totalTaxes

            })
            .addCase(getTicketsForPeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { fetchSalesStart, fetchSalesSuccess, fetchSalesFailure } = salesSlice.actions;

export const selectSales = (state: RootState) => state.titles.title;

export default salesSlice.reducer;
