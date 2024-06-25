
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { fetchSales } from '../services/saleService';

interface SalesState {
    sales: any[];
    loading: boolean;
    error: string | null;
}

const initialState: SalesState = {
    sales: [],
    loading: false,
    error: null,
};

// export const loadSales = (dateFrom: string, dateEnd: string): AppThunk => async (dispatch) => {
//     try {
//         dispatch(fetchSalesStart());
//         const data = await fetchSales(dateFrom, dateEnd);
//         dispatch(fetchSalesSuccess(data));
//     } catch (error: any) {
//         dispatch(fetchSalesFailure(error.message));
//     }
// };

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
});

export const { fetchSalesStart, fetchSalesSuccess, fetchSalesFailure } = salesSlice.actions;

export const selectSales = (state: RootState) => state.titles.title;

export default salesSlice.reducer;
