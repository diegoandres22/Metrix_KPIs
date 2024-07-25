export interface Payment {
    journal_id: number,                      //numero interno de jornada
    order_id: number,                      //numero de orden 
    bill_id: number,                      // numero de facturación
    bill_number: number,                      //numero de factura
    bill_datetime_string: string, //fecha de facturación
    amount_igtf: number,                     // monto del IGTF
    payform_id: number,                     //numero de forma de pago 
    payform_description: string,     //nombre de forma de pago 
    delivery_note_number: string,      //----------------
    currency_id: number,                          //id de moneda
    currency_description: string,          //nombre de la moneda
    amount_base_currency: number,          //monto en moneda base 
    amount_alternative_currency: number,        //monto en 2da moneda
    payments_tips_base_currency: number,               //MONTO propina base
    amount_tips_alternative_currency: number,    //monto propina moneda alternativa
    payments_tips_alternative_currency: number        //monto propina moneda alternativa
}