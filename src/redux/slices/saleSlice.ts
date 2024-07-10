
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getFacturesForPeriods, getTicketsForPeriods } from '../services/saleService';
import { Factura } from '@/types/factureInt';



interface SalesState {
    salesFiltered: Factura[];
    loading: boolean;
    error: string | null | undefined | unknown;
    totalSumOfSales: number;
    totalSumOfTaxes: number,
    totalSumOfServices: number,
    subTotal: number
}

const initialState: SalesState = {
    salesFiltered: [],
    loading: false,
    error: null,
    totalSumOfSales: 0,
    totalSumOfTaxes: 0,
    totalSumOfServices: 0,
    subTotal: 0

};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        fetchSalesStart(state) {
        },
        fetchSalesSuccess(state, action: PayloadAction) {
        },
        fetchSalesFailure(state, action: PayloadAction) {
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
                state.totalSumOfTaxes = action.payload.totalTaxes;
                state.subTotal = action.payload.subTotal;

            })
            .addCase(getTicketsForPeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getFacturesForPeriods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFacturesForPeriods.fulfilled, (state, action) => {
                state.loading = false;
                state.salesFiltered = action.payload

            })
            .addCase(getFacturesForPeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { fetchSalesStart, fetchSalesSuccess, fetchSalesFailure } = salesSlice.actions;

export const selectSales = (state: RootState) => state.titles.title;

export default salesSlice.reducer;
