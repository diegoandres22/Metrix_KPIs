
// Etiquetas de panel de control lateral
export const Titles = {
    start: "Inicio",

    salesTitle:"Ventas",
    Sales1: "Consolidado de ventas",
    Sales2: "Detallado por facturas",

    BuyTitle: "Compras",
    BuyDetail:"Facturas de compra",

    customersTitle:"Clientes",
    customers1: "Detalle de clientes",
    
    paymentsTitle: "Pagos",
    payments1: "Metodos de pago",


    Seventh: "Promociones",
    
    businessTitle: "Unidades de negocios",
    businessStatus: "Estado",
    businessAuditSummary: "Resumen de audiciones",
    businessAudit: "Auditar",
    
    Fifth: "Productos",
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
