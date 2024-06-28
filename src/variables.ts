
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

export const API_BASE_URL = 'http://localhost:3001/api/xconnect/api/ExtractionData';

export const endpoints = {
    salesFull: (dateFrom: string, dateEnd: string) =>
        `${API_BASE_URL}/SalesFull?dateFrom=${dateFrom}&dateEnd=${dateEnd}`,
    purchaseFull: (dateFrom: string, dateEnd: string) =>
        `${API_BASE_URL}/PurchaseFull?dateFrom=${dateFrom}&dateEnd=${dateEnd}`,
    SalesPayFull: (dateFrom: string, dateEnd: string) =>
        `${API_BASE_URL}/SalesPay?dateFrom=${dateFrom}&dateEnd=${dateEnd}`,
};
