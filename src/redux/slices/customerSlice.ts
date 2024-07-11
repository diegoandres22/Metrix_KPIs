
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCustomersForPeriods } from '../services/customerService';
import { Customers } from '@/types/customerInt';



interface CustomersState {
    customersFiltered: Customers[];
    allCustomers: Customers[],
    loading: boolean;
    error: string | null | undefined | unknown;
}

const initialState: CustomersState = {
    customersFiltered: [],
    allCustomers: [],
    loading: false,
    error: null,
};

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        fetchSalesStart(state) {
        },
        fetchSalesSuccess(state, action: PayloadAction) {
        },
        fetchSalesFailure(state, action: PayloadAction) {
        },
        removeCustomersForPeriods(state) {
            state.customersFiltered = [];
            state.allCustomers = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomersForPeriods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCustomersForPeriods.fulfilled, (state, action) => {
                state.loading = false;
                state.customersFiltered = action.payload
                state.allCustomers = action.payload

            })
            .addCase(getCustomersForPeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const selectSales = (state: RootState) => state.titles.title;

export default customerSlice.reducer;
