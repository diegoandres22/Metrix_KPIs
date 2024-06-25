




// Etiquetas de panel de control lateral
export const Titles = {
    First: "Inicio",
    Sales1: "Resumen de ventas",
    Sales2: "Ventas en tiempo real",
    Sales3: "Metodos de pago",

    Third: "Compras",
    Fourth: "Metricas",
    Fifth: "Productos",
    Sixth: "Clientes",
    Seventh: "Promociones",
    Eighth: "Libro Rojo",
    Nineth: "Auditorias"
};

//Variables Endspoints para consumo de api 

export const API_BASE_URL_ventas = 'http://26.96.128.174:9090/xconnect/api/ExtractionData';
export const API_BASE_URL_compras = 'http://26.96.128.174:9090/xconnect/api/ExtractionData';
export const API_BASE_URL_pagos = 'http://26.96.128.174:9090/xconnect/api/ExtractionData';


export const endpoints = {
    salesFull: (dateFrom: string, dateEnd: string) =>
        `${API_BASE_URL_ventas}/SalesFull?dateFrom=${dateFrom}&dateEnd=${dateEnd}`,
    purchaseFull: (dateFrom: string, dateEnd: string) =>
        `${API_BASE_URL_compras}/PurchaseFull?dateFrom=${dateFrom}&dateEnd=${dateEnd}`,
    SalesPayFull: (dateFrom: string, dateEnd: string) =>
        `${API_BASE_URL_compras}/SalesPay?dateFrom=${dateFrom}&dateEnd=${dateEnd}`,
};
