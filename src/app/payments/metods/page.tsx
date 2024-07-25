
"use client";

import { useAppDispatch } from '@/redux/services/hooks';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DatePicker, Button, Input, DateValue, Table, TableHeader, TableColumn, TableRow, TableBody, TableCell } from '@nextui-org/react';
import React, { useEffect, useMemo, useState } from 'react'
import { getLocalTimeZone, today } from '@internationalized/date';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getPaymentForPeriods } from '@/redux/services/paymentService';
import { Payment } from '@/types/paymentInt';


interface InputValue {
    type: string;
    from: string | null;
    to: string | null;
    branch: string;
}

export default function Payments() {

    const dispatch = useAppDispatch();
    const loading = useSelector((state: RootState) => state.payments.loading);
    const paymentsSummary = useSelector((state: RootState) => state.payments.paymentSummary);
    const [inputValue, setInputValue] = useState<InputValue>({
        type: '',
        from: '',
        to: '',
        branch: ''
    });

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const selectedValue = useMemo(
        () => selectedKeys.length === 0 ? "Seleccione unidad" : selectedKeys.join(", ").replace(/_/g, " "),
        [selectedKeys]
    );


    useEffect(() => {
        dispatch(setTitle(Titles.payments1))

        const { year, day, month } = today(getLocalTimeZone());

        let YEAR = year.toString().padStart(4, '0');
        let MONTH = month.toString().padStart(2, '0');
        let DAY = day.toString().padStart(2, '0');

        const newInputValue = {
            ...inputValue,
            to: YEAR + MONTH + DAY,
            from: YEAR + MONTH + DAY
        };

        setInputValue(newInputValue);

    }, []);

    const handleSelectionChange = (keys: any) => {
        setSelectedKeys([...keys]);
    };
    const handleInputChange = (value: DateValue, field: keyof InputValue) => {
        let year = value.year.toString().padStart(4, '0');
        let month = value.month.toString().padStart(2, '0');
        let day = value.day.toString().padStart(2, '0');

        let YYYYMMDD = year + month + day;

        setInputValue({
            ...inputValue,
            [field]: YYYYMMDD
        });
    };
    const handleCalculate = () => {
        const numFecha1 = parseInt(inputValue.from as string, 10);
        const numFecha2 = parseInt(inputValue.to as string, 10);
        if (numFecha1 > numFecha2) {
            enqueueSnackbar('Error en la fecha', { variant: 'error' });
            return;
        }
        if (inputValue.from && inputValue.to) {
            dispatch(getPaymentForPeriods({ dateFrom: inputValue.from, dateEnd: inputValue.to }));
        }
    };

    return (
        <div className='mt-[4em] flex flex-col '>

            <div className='flex w-[80vw] h-10% justify-center items-center gap-10 pt-4'>

                <div className=''>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered" className="capitalize">
                                {selectedValue}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Multiple selection example"
                            variant="flat"
                            closeOnSelect={false}
                            disallowEmptySelection
                            selectionMode="multiple"
                            selectedKeys={selectedKeys}
                            onSelectionChange={handleSelectionChange}
                        >
                            {["Brisas", "Makai", "DMG", "Macuto"].map((item) => (
                                <DropdownItem key={item.toLowerCase().replace(" ", "_")}>{item}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div className=''>
                    <DatePicker
                        className=''
                        onChange={(date) => handleInputChange(date, 'from')}
                        size='sm'
                        label={'Desde'}
                        name='from'
                        defaultValue={today(getLocalTimeZone())}
                        maxValue={today(getLocalTimeZone())}
                    />
                </div>

                <div className=''>
                    <DatePicker
                        onChange={(date) => handleInputChange(date, 'to')}
                        size='sm'
                        label={'Hasta'}
                        name='to'
                        className='max-w-sm'
                        defaultValue={today(getLocalTimeZone())}
                        maxValue={today(getLocalTimeZone())}
                    />
                </div>

                <Button
                    className='bg-green-400 text-black'
                    variant='shadow'
                    onClick={handleCalculate}
                    isLoading={loading}
                    isDisabled={!inputValue.from || !inputValue.to}
                >
                    {!loading && 'Buscar'}
                </Button>
            </div>
            <div className='flex justify-start items-start px-5 pb-2'>
                <span className='text-default-400 text-small'>Total {paymentsSummary.length} Formas de pago</span>
            </div>

            <div className="flex w-[70vw] overflow-auto mx-auto">
                <Table removeWrapper isHeaderSticky aria-label="pagos" classNames={{
                    base: "max-h-[420px]",
                }}>
                    <TableHeader>
                        <TableColumn>Fecha </TableColumn>
                        <TableColumn>Moneda </TableColumn>
                        <TableColumn>Forma de pago</TableColumn>
                        <TableColumn>Total </TableColumn>
                    </TableHeader>
                    <TableBody items={paymentsSummary}>
                        {(item: Payment) => (
                            <TableRow key={item.bill_id} aria-label='Pagos'>
                                <TableCell>{item.bill_datetime_string}</TableCell>
                                <TableCell>{item.currency_description}</TableCell>
                                <TableCell>{item.payform_description}</TableCell>
                                <TableCell>{item.amount_base_currency}</TableCell>

                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}
