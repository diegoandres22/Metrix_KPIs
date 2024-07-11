export interface Ticket {
    status: string;
    header_id: number,
    number_document: string,
    number_control: string,
    date_document_string: string,
    date_reception_string: string,
    upplier_id: number,
    supplier_name: string,
    upplier_rif: string,
    sub_total_bill: number,
    tax_percentage_bill: number,
    tax_bill: number,
    tax_other_amount: number,
    discount_bill: number,
    net_bill: number,
    total_bill: number,
    currency_bill: number,
    currency_name: string,
    item_id: number,
    product_name: string,
    product_cost_unit: number,
    product_cost_total: number,
    tax_value_item: number,
    item_tax: number,
    item_tax_other: number,
    item_discount: number,
    item_net_price: number,
    item_total: number,
    exchange_date_day: number,
    exchange_date_day_date_document: number,
    net_price: number,
    total: number,
    tax_value: number,
    service_value: number,
    product_total: number,
    bill_datetime_string: string,
    product_net_price: number,
    customer_identification: string,
    order_id: number,
    quantity: number
}







export interface Ticket2 {
    amount_igtf: number,
    bill_datetime_long: number,
    bill_datetime_string: string,
    total: number,
    subtotal: number,
    net_price: number,
    tax_value: number,
    bill_id: number,
    bill_number: number,
    fact_notec: number,
    fiscal_printer_serial: string,
    station_bill_id: number,
    type_doc: string,
    customer_identification: number,
    customer_name: string,
    customer_address: string,
    customer_id: number
    customer_phone: string
    customer_type: string
    tips: number
    discount: number
    exchange_date_day: number
    product_total: number
    product_net_price: number
    product_subtotal: number
    product_discount: number
    product_tax_value: number
    product_stock: number
    quantity: number
    product_name: string
    family_code: number
    family_name: string
    product_type_name: string
    product_type_code: number
    product_code: number
    sale_price_1: number
    sale_price_2: number
    product_sale_price: number
    product_bar_code: number
    product_uoms_name: string
    order_id: number
    sale_voucher: number
    service_value: number
    status: string
    suborder_id: number
    tax_id: number
    station_name: string
    journal_end: number
    journal_id: number
    journal_start: number
}