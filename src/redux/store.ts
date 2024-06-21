import { configureStore } from "@reduxjs/toolkit";
import { titleSlice } from "./slices/titleSlice";

const store = configureStore({
    reducer: {
        titles: titleSlice.reducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch

export default store;
