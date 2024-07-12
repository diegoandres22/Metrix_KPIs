'use client'

import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';
import { useAppDispatch } from '@/redux/services/hooks';
import { getTicketsForPeriods } from '@/redux/services/saleService';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Autocomplete, AutocompleteItem, Button, DatePicker, DateValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip as ChakraTooltip, Card, CardBody, Tab, Tabs } from '@nextui-org/react';

import { getLocalTimeZone, today } from "@internationalized/date";
import { enqueueSnackbar } from 'notistack';
import { removeTotals } from '@/redux/slices/saleSlice';

interface InputValue {
  type: string;
  from: string | number | null;
  to: string | number | null;
  branch: string;
}

export default function Resumen() {

  const dispatch = useAppDispatch();

  const data = [
    { "name": "Enero", "Ventas": 0 }
  ]

  const salesLoading = useSelector((state: RootState) => state.sales.loading)
  const totalSumOfSales = useSelector((state: RootState) => state.sales.totalSumOfSales)
  const totalSumOfServices = useSelector((state: RootState) => state.sales.totalSumOfServices)
  const totalSumOfTaxes = useSelector((state: RootState) => state.sales.totalSumOfTaxes)
  const subTotal = useSelector((state: RootState) => state.sales.subTotal)



  const [inputValue, setInputValue] = useState({
    type: "",
    from: '',
    to: '',
    branch: ""
  });
  const [inputDate, setInputDate] = useState({

    from: '',
    to: '',

  });







  const handleInputChange = (value: DateValue, field: keyof InputValue) => {

    let year = value.year.toString().padStart(4, '0');
    let month = value.month.toString().padStart(2, '0');
    let day = value.day.toString().padStart(2, '0');

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let monthName = monthNames[value.month - 1];

    let YYYYMMDD = year + month + day;
    setInputDate({
      ...inputDate,
      [field]: `${day} de ${monthName}`
    }
    )

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
      dispatch(getTicketsForPeriods({ dateFrom: inputValue.from, dateEnd: inputValue.to }));
    }
  };




  useEffect(() => {
    dispatch(setTitle(Titles.Sales1))

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

  }, []);


  useEffect(() => {

    return () => {
      dispatch(removeTotals())
    };
  }, [inputValue]);


  if (typeof window === 'undefined') {
    return null;
  }
  return (
    <div className='mt-[4em] '>
      <div className="flex w-[80vw] h-10% p-5 justify-center items-center gap-10">

        <div className="">
          <Autocomplete
            size='sm'
            label="Tienda"
            className="max-w-xs  " >

            <AutocompleteItem key={'1'} >
              Todos
            </AutocompleteItem>
            <AutocompleteItem key={'2'} >
              Especialidades brisas y mar 2022
            </AutocompleteItem>
            <AutocompleteItem key={'3'} >
              Makai
            </AutocompleteItem>
            <AutocompleteItem key={'4'} >
              Don Manuel Grill
            </AutocompleteItem>
            <AutocompleteItem key={'5'} >
              COFFE Macuto
            </AutocompleteItem>

          </Autocomplete>
        </div>

        <div className="">
          <DatePicker className=" max-w-sm"
            onChange={(date) => handleInputChange(date, 'from')}
            size='sm'
            label={"Desde"}
            name="from"
            defaultValue={today(getLocalTimeZone())}
            maxValue={today(getLocalTimeZone())}

          />
        </div>

        <div className="">
          <DatePicker
            onChange={(date) => handleInputChange(date, 'to')}
            size='sm'
            label={"Hasta"}
            name="to"
            className="max-w-sm"
            defaultValue={today(getLocalTimeZone())}
            maxValue={today(getLocalTimeZone())}
          />
        </div>

        <ChakraTooltip content="Traer las ventas">

          <Button className="bg-green-400 text-black" variant="shadow"
            onClick={handleCalculate}
            isLoading={salesLoading}
            isDisabled={!inputValue.from || !inputValue.to} >
            {!salesLoading && 'Calcular'}
          </Button>
        </ChakraTooltip>

      </div>
      <div className="flex w-[70vw] m-auto p-5  ">
        <Table removeWrapper aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Venta neta</TableColumn>
            <TableColumn>Servicios</TableColumn>
            <TableColumn>Impuestos</TableColumn>
            <TableColumn>TOTAL</TableColumn>
            <TableColumn>Moneda</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>{!salesLoading && subTotal > 0 && <h2 className='flex gap-2 text-2xl' >{subTotal}<p>  </p></h2>}</TableCell>
              <TableCell>{!salesLoading && totalSumOfServices > 0 && <h3 > {totalSumOfServices} </h3>}</TableCell>
              <TableCell>{!salesLoading && totalSumOfTaxes > 0 && <h3 > {totalSumOfTaxes} </h3>}</TableCell>
              <TableCell>{!salesLoading && totalSumOfSales > 0 && <h3 >{totalSumOfSales}</h3>}</TableCell>
              <TableCell> {!salesLoading && totalSumOfSales > 0 && '$'} </TableCell>

            </TableRow>

          </TableBody>
        </Table>

      </div>

      <div className="flex w-[80vw]  ">
        <div className="w-full lg:w-[80%]">
          <BarChart width={800} height={250} data={data} className="absolute top-0 left-0 w-full h-full">
            <CartesianGrid strokeDasharray="6 6" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Ventas" fill="#45D483" />
          </BarChart>
        </div>
        <div className="w-[20%] flex flex-col gap-4 pr-6" >
          {/* <Button color="success" variant="light">
            Año
          </Button>
          <Button color="success" variant="light">
            Mes
          </Button> */}
          <Tabs aria-label="Options" placement='start' size='lg'>
            <Tab key="Año" title="Año">

            </Tab>
            <Tab key="Mes" title="Mes">

            </Tab>
            <Tab key="Semana" title="Semana">

            </Tab>
          </Tabs>
        </div>

      </div>
    </div >
  )
}


