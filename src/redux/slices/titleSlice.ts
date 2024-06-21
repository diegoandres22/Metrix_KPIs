import { createSlice } from "@reduxjs/toolkit";

export const titleSlice = createSlice({
    name: "titleDinamic",
    initialState: {
        title: "Bienvenido"
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        }
    }

})
export const {setTitle}= titleSlice.actions;