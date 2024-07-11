'use client'

import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';
import { useAppDispatch } from '@/redux/services/hooks';
import { getTicketsForPeriods } from '@/redux/services/saleService';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Autocomplete, AutocompleteItem, Button, DatePicker, DateValue } from '@nextui-org/react';

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
    { "name": "Enero", "Ventas": 4000, "Gastos": 2400 },
    { "name": "Febrero", "Ventas": 3000, "Gastos": 1398 },
    { "name": "Marzo", "Ventas": 2000, "Gastos": 5800 },
    { "name": "Abril", "Ventas": 2780, "Gastos": 3908 },
    { "name": "Mayo", "Ventas": 1890, "Gastos": 4800 },
    { "name": "Junio", "Ventas": 2390, "Gastos": 3800 },
    { "name": "Julio", "Ventas": 3490, "Gastos": 4300 }
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

        <Button className="bg-green-400 text-black" variant="shadow"
          onClick={handleCalculate}
          isLoading={salesLoading}
          isDisabled={!inputValue.from || !inputValue.to} >
          {!salesLoading && 'Calcular'}
        </Button>

      </div>

      <div className="flex w-[80vw] h-10% p-5  ">
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Ventas" fill="#45D483" />
          <Bar dataKey="Gastos" fill="#C71585" />
        </BarChart>

        <div className='flex flex-col items-center justify-center m-auto '>

          <h3>Sub-total : </h3>
          {!salesLoading && subTotal > 0 && <h2 className='flex gap-2 text-2xl' >{subTotal}<p> $ </p></h2>}

          <div className='flex flex-col text-slate-400 items-center justify-center'>

            {!salesLoading && inputDate.from.length > 0 && inputDate.to.length > 0 && <h3>{inputDate.from} - {inputDate.to}</h3>}

            {!salesLoading && totalSumOfServices > 0 && <h3 >Servicios: {totalSumOfServices} </h3>}
            {!salesLoading && totalSumOfTaxes > 0 && <h3 >Impuestos: {totalSumOfTaxes} </h3>}
            {!salesLoading && totalSumOfSales > 0 && <h3 >Total ventas: {totalSumOfSales} </h3>}

          </div>
        </div>

      </div>
    </div >
  )
}
