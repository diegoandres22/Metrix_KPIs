'use client'

import React, { useEffect, useState } from 'react'
import { Stat, StatHelpText, StatLabel, StatNumber, } from '@chakra-ui/react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';
import { useAppDispatch } from '@/redux/services/hooks';
import { getTickets } from '@/redux/services/saleService';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Autocomplete, AutocompleteItem, Button, DatePicker, DateValue } from '@nextui-org/react';

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

    console.log('CALENDARIO', value);


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
    if (inputValue.from && inputValue.to) {
      dispatch(getTickets({ dateFrom: inputValue.from, dateEnd: inputValue.to }));
    }
  };


  useEffect(() => {
    dispatch(setTitle(Titles.Sales1))

  }, []);


  useEffect(() => {
    console.log("soy InputValue: ", inputValue);

  }, [inputValue]);



  return (
    <div className='mt-[4em] '>
      <div className="flex w-[80vw] h-10% p-5 justify-center items-center gap-10">

        <div className="">
          <Autocomplete
            size='sm'
            label="Tienda"
            className="max-w-xs " >

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
            showMonthAndYearPickers={true}
          />
        </div>

        <div className="">
          <DatePicker
            onChange={(date) => handleInputChange(date, 'to')}
            showMonthAndYearPickers={true}
            size='sm'
            label={"Hasta"}
            name="to"
            className="max-w-sm" />
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

        <div className='flex items-center justify-center m-auto '>
          <Stat >
            <StatLabel>Total en ventas</StatLabel>
            <StatNumber>$240.00</StatNumber>

            {inputDate.from.length > 0 && inputDate.to.length > 0 && <StatHelpText >{inputDate.from} - {inputDate.to} </StatHelpText>}
          </Stat>
        </div>

      </div>
    </div >
  )
}
