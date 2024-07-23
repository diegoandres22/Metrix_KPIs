
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPurchasesForPeriods } from '../services/purchasesService';
import { Factura_compras } from '@/types/factura_compraInt';


interface purchaseState {
    purchaseFiltered: Factura_compras[];
    allPurchases: Factura_compras[],
    loading: boolean;
    error: string | null | undefined | unknown;
}

const initialState: purchaseState = {
    purchaseFiltered: [],
    allPurchases: [],
    loading: false,
    error: null,
};

const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        removePurchases(state) {
            state.allPurchases = []
            state.purchaseFiltered = []
        },

        filterPurchases(state, action: PayloadAction<string>) {
            const searchTerm = action.payload.toLowerCase();
            state.purchaseFiltered = state.allPurchases.filter(customer =>
                customer.proveedor_nombre.toLowerCase().includes(searchTerm) ||
                customer.id.toString().includes(searchTerm) ||
                customer.proveedor_rif.toString().includes(searchTerm) ||
                customer.factura_num.toString().includes(searchTerm)
            );

        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPurchasesForPeriods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPurchasesForPeriods.fulfilled, (state, action) => {
                state.loading = false;
                state.allPurchases = action.payload
                state.purchaseFiltered = action.payload

            })
            .addCase(getPurchasesForPeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { removePurchases, filterPurchases } = purchaseSlice.actions;

export default purchaseSlice.reducer;
