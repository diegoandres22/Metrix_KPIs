
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getFacturesForPeriods, getTicketsForPeriods } from '../services/saleService';
import { Factura } from '@/types/factureInt';



interface SalesState {
    salesFiltered: Factura[],
    allSales: Factura[],
    loading: boolean;
    error: string | null | undefined | unknown;
    totalSumOfSales: number;
    totalSumOfTaxes: number,
    totalSumOfServices: number,
    subTotal: number
}

const initialState: SalesState = {
    salesFiltered: [],
    allSales: [],
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
        removeFacturesForPeriods(state) {
            state.salesFiltered = [];
            state.allSales = [];
        },
        removeTotals(state) {
            state.totalSumOfSales = 0;
            state.totalSumOfServices = 0;
            state.totalSumOfTaxes = 0;
            state.subTotal = 0;
        },
        filterBills(state, action: PayloadAction<string>) {

            const searchTerm = action.payload.toLowerCase();
            state.salesFiltered = state.allSales.filter(bill =>
                bill.nombre_cliente.toLowerCase().includes(searchTerm) ||
                bill.cedula_cliente.toLowerCase().includes(searchTerm)

            );
        }
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
                state.allSales = action.payload

            })
            .addCase(getFacturesForPeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { fetchSalesStart, fetchSalesSuccess, fetchSalesFailure, removeFacturesForPeriods, removeTotals, filterBills } = salesSlice.actions;

export const selectSales = (state: RootState) => state.sales.salesFiltered;

export default salesSlice.reducer;
