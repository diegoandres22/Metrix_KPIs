'use client'
import React, { useEffect, useMemo, useState } from 'react';

import { useAppDispatch } from '@/redux/services/hooks';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Autocomplete, AutocompleteItem, DatePicker, Button, DateValue, Input, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Divider, SortDescriptor, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { enqueueSnackbar } from 'notistack';
import { getFacturesForPeriods } from '@/redux/services/saleService';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Factura } from '@/types/factureInt';
import { SearchIcon } from '@chakra-ui/icons';
import { Product } from '@/types/productInt';
import { filterBills, removeFacturesForPeriods } from '@/redux/slices/saleSlice';



interface InputValue {
  type: string;
  from: string | number | null;
  to: string | number | null;
  branch: string;
}




export default function Actual() {


  const salesLoading = useSelector((state: RootState) => state.sales.loading)
  const salesFiltered = useSelector((state: RootState) => state.sales.salesFiltered)

  const [inputValue, setInputValue] = useState({
    type: "",
    from: '',
    to: '',
    branch: ""
  });
  const [billValue, setBillValue] = useState<Factura>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();


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

  const sortedBills = salesFiltered.slice().sort((a, b) => {
    if (!sortDescriptor || !sortDescriptor.column) return 0;

    const aValue = a[sortDescriptor.column as keyof Factura];
    const bValue = b[sortDescriptor.column as keyof Factura];

    if (aValue === undefined || bValue === undefined) return 0;

    if (sortDescriptor.direction === "ascending") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });







  useEffect(() => {
    dispatch(setTitle(Titles.Sales2))


    const { year, day, month } = today(getLocalTimeZone())

    let YEAR = year.toString().padStart(4, '0');
    let MONTH = month.toString().padStart(2, '0');
    let DAY = day.toString().padStart(2, '0');

    const newInputValue = {
      ...inputValue,
      to: YEAR + MONTH + DAY,
      from: YEAR + MONTH + DAY
    };

    setInputValue(newInputValue)
    return () => {
      dispatch(removeFacturesForPeriods())
    };
  }, []);

  useEffect(() => {



  }, [billValue, salesFiltered]);



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
    const numFecha1 = parseInt(inputValue.from, 10);
    const numFecha2 = parseInt(inputValue.to, 10);
    if (numFecha1 > numFecha2) {

      enqueueSnackbar('Error en la fecha', { variant: 'error' });
      return
    }
    if (inputValue.from && inputValue.to) {
      dispatch(getFacturesForPeriods({ dateFrom: inputValue.from, dateEnd: inputValue.to }));
    }
  };

  const onClear = React.useCallback(() => {
  }, [])




  const handleOpen = (backdrop: any) => {

    onOpen();
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterBills(event.target.value));
  };

  return (
    <div className='mt-[4em] overflow-hidden'>
      <div className="flex w-[80vw] h-10% p-5 justify-center items-center gap-10 ">

        <div className="">
          <Input
            isClearable

            className="w-full"
            placeholder="Buscar"
            startContent={<SearchIcon />}

            onChange={handleSearchChange}
            onClear={() => dispatch(filterBills(''))}
          />
        </div>

        <div className="">
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

        <div className="">
          <DatePicker className=""
            onChange={(date) => handleInputChange(date, 'from')}
            size='sm'
            label={"Desde"}
            name="from"
            defaultValue={today(getLocalTimeZone())}
            maxValue={today(getLocalTimeZone())}
          />
        </div>

        <div className="">
          <DatePicker onChange={(date) => handleInputChange(date, 'to')}
            size='sm'
            label={"Hasta"}
            name="to"
            className="max-w-sm"
            defaultValue={today(getLocalTimeZone())}
            maxValue={today(getLocalTimeZone())}
          />
        </div>

        <Button className="bg-green-400 text-black" variant="shadow"
          onClick={handleCalculate}
          isLoading={salesLoading}
          isDisabled={!inputValue.from || !inputValue.to} >
          {!salesLoading && 'Buscar'}
        </Button>

      </div>
      <div className="flex justify-start items-start px-5">
        <span className="text-default-400 text-small">Total {salesFiltered.length} Facturas</span>

      </div>
      <div className="h-[70vh] w-[80vw] px-4 overflow-hidden">
        <Table
          isHeaderSticky
          className=' w-full '
          selectionMode="single"
          classNames={{
            base: "max-h-[70vh] ",
            table: "min-h-[420px]",
          }}
          aria-labelledby="tabla-ventas-label"

          sortDescriptor={sortDescriptor}
          onSortChange={handleSortChange}
        >
          <TableHeader>
            <TableColumn key="factura" allowsSorting>
              Factura
            </TableColumn>
            <TableColumn key="nombre_cliente" allowsSorting>
              Nombre
            </TableColumn>
            <TableColumn key="cedula_cliente" >
              cedula
            </TableColumn>
            <TableColumn key="total_productos" allowsSorting>
              Total productos
            </TableColumn>
            <TableColumn key="neto_factura" allowsSorting>
              Neto factura
            </TableColumn>
            <TableColumn key="impuesto_factura" allowsSorting>
              Impuesto factura
            </TableColumn>
            <TableColumn key="servicio" allowsSorting>
              Servicio
            </TableColumn>
            <TableColumn key="total_factura" allowsSorting>
              Total factura
            </TableColumn>
          </TableHeader>
          <TableBody
            items={sortedBills}
            isLoading={salesLoading}

            emptyContent={"No hay facturas"}
            loadingContent={<Spinner label="Cargando facturas..." />}

          >
            {(item: Factura) => (

              <TableRow key={item.factura}
                onClick={() => {
                  handleOpen(item)
                  setBillValue(item)
                }} aria-label="Ver factura"  >
                <TableCell>{item.factura}</TableCell>
                <TableCell>{item.nombre_cliente}</TableCell>
                <TableCell>{item.cedula_cliente}</TableCell>
                <TableCell >{item.total_productos.length}</TableCell>
                <TableCell>{item.neto_factura}</TableCell>
                <TableCell>{item.impuesto_factura}</TableCell>
                <TableCell>{item.servicio}</TableCell>
                <TableCell>{item.total_factura}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose} size={"5xl"}  >
          <ModalContent className=' sm:my-0 md:my-0  p-10 overflow-hidden'>
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-around ">
                  <div className="flex gap-1">
                    <p className='text-colorDetailBill'>Número de factura:</p><b>
                      {billValue?.factura}
                    </b>
                  </div>

                  <div className="flex gap-1">
                    <p className='text-colorDetailBill'>Cliente :</p><b>
                      <h3> {billValue?.nombre_cliente} </h3>
                    </b>
                  </div>

                  <div className="flex gap-1">
                    <p className='text-colorDetailBill'>Fecha:</p><b>
                      {billValue?.fecha}
                    </b>
                  </div>

                </ModalHeader>
                <ModalBody className=''>
                  <div className="w-full h-full flex gap-4 justify-between">
                    <div className="flex gap-1">
                      <p className='text-colorDetailBill'>Estado:</p><b>
                        {billValue?.estado}
                      </b>
                    </div>

                    <div className="flex gap-1">
                      <p className='text-colorDetailBill'>Número de Cédula:</p><b>
                        {billValue?.cedula_cliente}
                      </b>
                    </div>

                    <div className="flex gap-1">
                      <p className='text-colorDetailBill'>Número de Teléfono:</p>
                      <b>
                        {billValue?.numero_cliente && billValue.numero_cliente > 1 ? billValue.numero_cliente : " -"}
                      </b>
                    </div>
                    <div className="flex gap-1">
                      <p className='text-colorDetailBill'>Dirección:</p>
                      <b>
                        {billValue?.direccion_cliente && billValue.direccion_cliente.length > 1 ? billValue?.direccion_cliente : " -"}
                      </b>
                    </div>
                  </div>
                  <Divider className="my-1" />
                  <div className="w-full h-full flex gap-4 justify-between">
                    <div className="flex gap-1">
                      <p className='text-colorDetailBill'>Orden:</p><b>
                        {billValue?.orden}
                      </b>
                    </div>

                    <div className="flex gap-1">
                      <p className='text-colorDetailBill'>Caja que factura:</p>
                      <b>  Johana gonzales  </b>
                    </div>

                    <div className="flex gap-1">
                      <p className='text-colorDetailBill'>Anfitrión / Anfitriona:</p>
                      <b>  YEILET RODRIGUEZ  </b>
                    </div>


                  </div>
                  <Divider className="my-1" />

                  <div className="w-full h-full flex gap-4 justify-between">
                    <div className="flex gap-2">
                      <p className='text-colorDetailBill'>Valor neto:</p>
                      <b> {billValue?.neto_factura}</b>
                    </div>

                    <Divider orientation="vertical" />
                    <div className="flex gap-2">
                      <p className='text-colorDetailBill'>Impuesto:</p>
                      <b> {billValue?.impuesto_factura}  </b>
                    </div>

                    <Divider orientation="vertical" />
                    <div className="flex gap-2">
                      <p className='text-colorDetailBill'>Valor servicio:</p>
                      <b> {billValue?.servicio} </b>
                    </div>

                    <Divider orientation='vertical' />

                    <div className="flex gap-2">
                      <p className='text-colorDetailBill'>Total:</p>
                      <b> {billValue?.total_factura} </b>
                    </div>
                  </div>


                  <Table isStriped aria-label="Example static collection table" className='max-h-[50vh] overflow-auto'>
                    <TableHeader>
                      <TableColumn>Producto</TableColumn>
                      <TableColumn>Familia</TableColumn>
                      <TableColumn>Tipo</TableColumn>
                      <TableColumn>Cantidad</TableColumn>
                      <TableColumn>Código</TableColumn>
                      <TableColumn>Precio neto</TableColumn>
                      <TableColumn>Impuesto</TableColumn>
                      <TableColumn>Total</TableColumn>
                    </TableHeader>
                    <TableBody
                      items={billValue?.total_productos} >
                      {(item: Product) => (

                        <TableRow key={item.codigo}
                          aria-label="Productos"  >
                          <TableCell>{item.producto}</TableCell>
                          <TableCell>{item.familia}</TableCell>
                          <TableCell>{item.tipo}</TableCell>
                          <TableCell>{item.cantidad} </TableCell>
                          <TableCell>{item.codigo}</TableCell>
                          <TableCell>{item.neto_producto}</TableCell>
                          <TableCell>{item.impuesto_producto}</TableCell>
                          <TableCell>{item.total_producto} </TableCell>
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

    </div>
  );
}

