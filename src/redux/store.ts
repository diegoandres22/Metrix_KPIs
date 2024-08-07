import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { titleSlice } from "./slices/titleSlice";
import salesReducer from "./slices/saleSlice";
import customerSlice from "./slices/customerSlice";
import purchaseSlice from "./slices/purchaseSlice";
import paymentSlice from "./slices/paymentSlice";

export const store = configureStore({
    reducer: {
        titles: titleSlice.reducer,
        sales: salesReducer,
        customers: customerSlice,
        purchases: purchaseSlice,
        payments: paymentSlice
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

