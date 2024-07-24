'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch } from '@/redux/services/hooks';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';
import { getPurchasesForPeriods } from '@/redux/services/purchasesService';
import { SearchIcon } from '@chakra-ui/icons';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { DatePicker, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Table, Spinner, Modal, ModalContent, ModalHeader, ModalBody, Divider, DateValue, SortDescriptor, useDisclosure, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { getLocalTimeZone, today } from '@internationalized/date';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Factura_compras } from '@/types/factura_compraInt';
import { Producto_compras } from '@/types/producto_comprasInt';
import { removePurchases, filterPurchases } from '@/redux/slices/purchaseSlice';


interface InputValue {
    type: string;
    from: string | null;
    to: string | null;
    branch: string;
}

export default function Purchases() {


    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor | undefined>(undefined);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const totalPurchases = useSelector((state: RootState) => state.purchases.purchaseFiltered);
    const loading = useSelector((state: RootState) => state.purchases.loading);
    const [billValue, setBillValue] = useState<Factura_compras | undefined>();
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

    
    const handleSelectionChange = (keys: any) => {
        setSelectedKeys([...keys]);
    };
    
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setTitle(Titles.BuyDetail))
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
        return () => {
            dispatch(removePurchases());
        };

    }, []);

    useEffect(() => {

    }, [totalPurchases])


    const handleSortChange = (descriptor: SortDescriptor) => {
        setSortDescriptor(descriptor);
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
            dispatch(getPurchasesForPeriods({ dateFrom: inputValue.from, dateEnd: inputValue.to }));
        }
    };

    const sortedPurchases = totalPurchases.slice().sort((a, b) => {
        if (!sortDescriptor || !sortDescriptor.column) return 0;

        const { column, direction } = sortDescriptor;

        const getValue = (obj: Factura_compras, column: string) => {
            const value = obj[column as keyof Factura_compras];
            if (typeof value === 'string') {
                if (!isNaN(Date.parse(value))) {
                    return new Date(value).getTime();
                }
                if (!isNaN(parseFloat(value))) {
                    return parseFloat(value);
                }
                return value.toLowerCase();
            }
            return value;
        };

        const aValue = getValue(a, column as string);
        const bValue = getValue(b, column as string);

        if (aValue === bValue) return 0;
        return direction === 'ascending' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });




    const handleOpen = (backdrop: any) => {
        onOpen();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filterPurchases(event.target.value));
    };

    return (
        <div className='mt-[4em] overflow-hidden'>
            <div className='flex w-[80vw] h-10% p-5 justify-center items-center gap-10 '>
                <div className=''>
                    <Input
                        isClearable
                        className='w-full'
                        placeholder='Buscar'
                        startContent={<SearchIcon />}

                        onChange={handleSearchChange}
                        onClear={() => dispatch(filterPurchases(''))}
                    />
                </div>

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

            <div className='flex justify-start items-start px-5'>
                <span className='text-default-400 text-small'>Total {totalPurchases.length} facturas</span>
            </div>

            <div className='h-[70vh] w-[80vw] px-4 overflow-hidden'>
                <Table
                    isHeaderSticky
                    className='w-full'
                    selectionMode='single'
                    classNames={{
                        base: 'max-h-[70vh]',
                        table: 'min-h-[420px]'
                    }}
                    aria-labelledby='tabla-compras-label'
                    sortDescriptor={sortDescriptor}
                    onSortChange={handleSortChange}
                >
                    <TableHeader>

                        <TableColumn key='id' allowsSorting>
                            Id
                        </TableColumn>
                        <TableColumn key='proveedor'>
                            Proveedor
                        </TableColumn>
                        <TableColumn key='factura_emision' allowsSorting>
                            Fecha emisión
                        </TableColumn>
                        <TableColumn key='factura_carga' allowsSorting>
                            Fecha carga
                        </TableColumn>
                        <TableColumn key='productos' allowsSorting>
                            Productos
                        </TableColumn>
                        <TableColumn key='total_factura' allowsSorting>
                            Total Factura
                        </TableColumn>


                    </TableHeader>
                    <TableBody
                        items={sortedPurchases}
                        isLoading={loading}
                        loadingContent={<Spinner label='Cargando facturas...' />}
                        emptyContent={"No hay facturas"}
                    >
                        {(item: Factura_compras) => (
                            <TableRow
                                key={item.id}
                                onClick={() => {
                                    handleOpen(item);
                                    setBillValue(item);
                                }}
                                aria-label='Ver factura'
                            >
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.proveedor_nombre}</TableCell>
                                <TableCell>{item.factura_emision}</TableCell>
                                <TableCell>{item.factura_carga}</TableCell>
                                <TableCell>{item.productos.length}</TableCell>
                                <TableCell>$ {item.total_factura}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} size={'5xl'} className='overflow-hidden'>
                <ModalContent className='sm:my-0 md:my-0 p-10 overflow-hidden'>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex justify-around '>
                                <div className='flex gap-1'>
                                    <p className='text-colorDetailBill'>Factura :</p>
                                    <b>{billValue?.factura_num}</b>
                                </div>

                                <div className='flex gap-1'>
                                    <p className='text-colorDetailBill'>Nombre :</p>
                                    <b>
                                        <h3> {billValue?.proveedor_nombre} </h3>
                                    </b>
                                </div>

                                <div className='flex gap-1'>
                                    <p className='text-colorDetailBill'>Proveedor id:</p>
                                    <b>{billValue?.proveedor_id}</b>
                                </div>
                            </ModalHeader>
                            <ModalBody className=''>
                                <div className='w-full h-full flex gap-4 justify-between'>
                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Número de RIF:</p>
                                        <b>{billValue?.proveedor_rif}</b>
                                    </div>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Tasa del día:</p>
                                        <b>{billValue?.tasa_dia}</b>
                                    </div>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Emitido :</p>
                                        <b>{billValue?.factura_emision}</b>
                                    </div>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Cargado :</p>
                                        <b>{billValue?.factura_carga}  </b>
                                    </div>

                                </div>

                                <Divider className="my-1" />

                                <div className='w-full h-full flex gap-4 justify-between'>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Moneda:</p>
                                        <b>{billValue?.moneda} </b>
                                    </div>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Sub-total :</p>
                                        <b>{billValue?.subtotal_factura}</b>
                                    </div>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Neto-factura :</p>
                                        <b>{billValue?.neto_factura} </b>
                                    </div>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Total : </p>
                                        <b>{billValue?.total_factura} </b>
                                    </div>
                                </div>

                                <Table isStriped aria-label='Example static collection table' className='max-h-[50vh] overflow-auto'>
                                    <TableHeader>
                                        <TableColumn>ID</TableColumn>
                                        <TableColumn>Producto</TableColumn>
                                        <TableColumn>Cantidad</TableColumn>
                                        <TableColumn>Precio unidad</TableColumn>
                                        <TableColumn>Precio total</TableColumn>

                                    </TableHeader>
                                    <TableBody items={billValue?.productos}>
                                        {(item: Producto_compras) => (
                                            <TableRow key={item.producto_id} aria-label='Clientes'>
                                                <TableCell>{item.producto_id}</TableCell>
                                                <TableCell>{item.producto_nombre}</TableCell>
                                                <TableCell>{item.producto_cantidad}</TableCell>
                                                <TableCell>$ {item.producto_unidad}</TableCell>
                                                <TableCell>$ {item.producto_total}</TableCell>

                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
