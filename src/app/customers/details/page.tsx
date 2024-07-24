
"use client";


import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Input, Autocomplete, AutocompleteItem, DatePicker, Button, DateValue, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { SearchIcon } from '@chakra-ui/icons';
import { getCustomersForPeriods } from '@/redux/services/customerService';
import { enqueueSnackbar } from 'notistack';
import { getLocalTimeZone, today } from '@internationalized/date';
import { Customers } from '@/types/customerInt';
import { Consumos } from '@/types/consumosInt';
import { useAppDispatch } from '@/redux/services/hooks';
import { SortDescriptor } from "@nextui-org/react";
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';
import { filterCustomers, removeCustomersForPeriods } from '@/redux/slices/customerSlice';



interface InputValue {
    type: string;
    from: string | null;
    to: string | null;
    branch: string;
}

export default function Actual() {

    const dispatch = useAppDispatch();


    const totalCustomers = useSelector((state: RootState) => state.customers.customersFiltered);
    const loading = useSelector((state: RootState) => state.customers.loading);

    const [billValue, setBillValue] = useState<Customers | undefined>();
    const [inputValue, setInputValue] = useState<InputValue>({
        type: '',
        from: '',
        to: '',
        branch: ''
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor | undefined>(undefined);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const selectedValue = useMemo(
        () => selectedKeys.length === 0 ? "Seleccione unidad" : selectedKeys.join(", ").replace(/_/g, " "),
        [selectedKeys]
    );


    const handleSelectionChange = (keys: any) => {
        setSelectedKeys([...keys]);
    };

    const handleSortChange = (descriptor: SortDescriptor) => {
        setSortDescriptor(descriptor);
    };

    useEffect(() => {
        dispatch(setTitle(Titles.customers1))

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
            dispatch(removeCustomersForPeriods());
        };
    }, []);

    useEffect(() => {

    }, [totalCustomers]);

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
            dispatch(getCustomersForPeriods({ dateFrom: inputValue.from, dateEnd: inputValue.to }));
        }
    };

    const handleOpen = (backdrop: any) => {
        onOpen();
    };

    const sortedCustomers = totalCustomers.slice().sort((a, b) => {
        if (!sortDescriptor || !sortDescriptor.column) return 0;

        const aValue = a[sortDescriptor.column as keyof Customers];
        const bValue = b[sortDescriptor.column as keyof Customers];

        if (aValue === undefined || bValue === undefined) return 0;

        if (sortDescriptor.direction === "ascending") {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filterCustomers(event.target.value));
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
                        onClear={() => dispatch(filterCustomers(''))}
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
                <span className='text-default-400 text-small'>Total {totalCustomers.length} Clientes</span>
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
                    aria-labelledby='tabla-ventas-label'
                    sortDescriptor={sortDescriptor}
                    onSortChange={handleSortChange}
                >
                    <TableHeader>
                        <TableColumn key='id' allowsSorting>
                            Id
                        </TableColumn>
                        <TableColumn key='nombre' allowsSorting>
                            Nombre
                        </TableColumn>
                        <TableColumn key='total_visitas' allowsSorting>
                            Visitas
                        </TableColumn>
                        <TableColumn key='consumo_total_USD' allowsSorting>
                            Total Consumo
                        </TableColumn>
                        <TableColumn key='numero_de_telefono' >
                            Teléfono
                        </TableColumn>
                        <TableColumn key='direccion' >
                            Dirección
                        </TableColumn>
                    </TableHeader>
                    <TableBody
                        items={sortedCustomers}
                        isLoading={loading}
                        loadingContent={<Spinner label='Cargando clientes...' />}
                        emptyContent={"No hay clientes"}
                    >
                        {(item: Customers) => (
                            <TableRow
                                key={item.cliente_id}
                                onClick={() => {
                                    handleOpen(item);
                                    setBillValue(item);
                                }}
                                aria-label='Ver cliente'
                            >
                                <TableCell>{item.cliente_id}</TableCell>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.total_visitas}</TableCell>
                                <TableCell>$ {item.consumo_total_USD}</TableCell>
                                <TableCell>{item.numero_de_telefono}</TableCell>
                                <TableCell>{item.direccion}</TableCell>
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
                                    <p className='text-colorDetailBill'>ID cliente:</p>
                                    <b>{billValue?.cliente_id}</b>
                                </div>

                                <div className='flex gap-1'>
                                    <p className='text-colorDetailBill'>Nombre :</p>
                                    <b>
                                        <h3> {billValue?.nombre} </h3>
                                    </b>
                                </div>

                                <div className='flex gap-1'>
                                    <p className='text-colorDetailBill'>Total visitas:</p>
                                    <b>{billValue?.total_visitas}</b>
                                </div>
                            </ModalHeader>
                            <ModalBody className=''>
                                <div className='w-full h-full flex gap-4 justify-between'>
                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Número de cedula:</p>
                                        <b>{billValue?.numero_de_cedula}</b>
                                    </div>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Dirección:</p>
                                        <b>{billValue?.direccion}</b>
                                    </div>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Número de telefono:</p>
                                        <b>{billValue?.numero_de_telefono}</b>
                                    </div>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>c:</p>
                                        <b>-------- $</b>
                                    </div>

                                </div>

                                <Divider className="my-1" />

                                <div className='w-full h-full flex gap-4 justify-between'>
                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Total servicio :</p>
                                        <b>{billValue?.servicio}</b>
                                    </div>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>a:</p>
                                        <b>----</b>
                                    </div>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>b:</p>
                                        <b>-----</b>
                                    </div>

                                    <div className='flex gap-1'>
                                        <p className='text-colorDetailBill'>Total consumo:</p>
                                        <b>{billValue?.consumo_total_USD} $</b>
                                    </div>
                                </div>

                                <Table isStriped aria-label='Example static collection table' className='max-h-[50vh] overflow-auto'>
                                    <TableHeader>
                                        <TableColumn>Producto</TableColumn>
                                        <TableColumn>Fecha</TableColumn>
                                        <TableColumn>Cantidad</TableColumn>
                                        <TableColumn>Número de orden</TableColumn>
                                        <TableColumn>Estado</TableColumn>
                                        <TableColumn>Precio </TableColumn>
                                        <TableColumn>Sub total </TableColumn>
                                        <TableColumn>Impuesto </TableColumn>
                                        <TableColumn>Total </TableColumn>

                                    </TableHeader>
                                    <TableBody items={billValue?.consumos}>
                                        {(item: Consumos) => (
                                            <TableRow key={item.producto_id} aria-label='Clientes'>
                                                <TableCell>{item.producto}</TableCell>
                                                <TableCell>{item.fecha}</TableCell>
                                                <TableCell>{item.cantidad}</TableCell>
                                                <TableCell>{item.numero_orden}</TableCell>
                                                <TableCell>{item.estado}</TableCell>
                                                <TableCell>{item.precio}</TableCell>
                                                <TableCell>{item.sub_total}</TableCell>
                                                <TableCell>{item.impuesto}</TableCell>
                                                <TableCell>{item.total_producto}</TableCell>

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
    );
}
