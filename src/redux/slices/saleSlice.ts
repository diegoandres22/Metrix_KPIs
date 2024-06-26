
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getTickets } from '../services/saleService';

interface SalesState {
    sales: any[];
    loading: boolean;
    error: string | null | undefined;
}

const initialState: SalesState = {
    sales: [],
    loading: false,
    error: null,
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
            .addCase(getTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.loading = false;

                state.sales = action.payload;
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { fetchSalesStart, fetchSalesSuccess, fetchSalesFailure } = salesSlice.actions;

export const selectSales = (state: RootState) => state.titles.title;

export default salesSlice.reducer;
