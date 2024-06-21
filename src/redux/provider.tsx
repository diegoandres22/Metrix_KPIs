"use client";

import { Provider } from "react-redux";
import store from "./store"; // Importación correcta para exportación default

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
