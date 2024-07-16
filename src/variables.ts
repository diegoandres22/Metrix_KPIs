
// Etiquetas de panel de control lateral
export const Titles = {
    First: "Inicio",

    salesTitle:"Ventas",
    Sales1: "Consolidado de ventas",
    Sales2: "Detallado por facturas",
    Sales3: "Detallado por pago",

    BuyTitle: "Compras",
    BuyDetail:"Detalle de compras",

    customersTitle:"Clientes",
    customers1: "Detalle de clientes",
    
    Fifth: "Productos",
    Sixth: "Clientes",
    Seventh: "Promociones",
    Eighth: "Libro Rojo",
    Nineth: "Auditorias"
};

//Variables Endspoints para consumo de api 

export const API_BASE_URL_especialidades = 'http://localhost:3001/api/xconnect/api/ExtractionData';

export const endpoints = {
    salesFull: (dateFrom: string, dateEnd: string) =>
        `${API_BASE_URL_especialidades}/SalesFull?dateFrom=${dateFrom}&dateEnd=${dateEnd}`,
    purchaseFull: (dateFrom: string, dateEnd: string) =>
        `${API_BASE_URL_especialidades}/PurchaseFull?dateFrom=${dateFrom}&dateEnd=${dateEnd}`,
    SalesPayFull: (dateFrom: string, dateEnd: string) =>
        `${API_BASE_URL_especialidades}/SalesPay?dateFrom=${dateFrom}&dateEnd=${dateEnd}`,
};
