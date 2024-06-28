'use client'

import React, { useEffect, useState } from 'react'
import { Stat, StatHelpText, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';
import { useAppDispatch } from '@/redux/services/hooks';
import { getTickets } from '@/redux/services/saleService';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Autocomplete, AutocompleteItem, Button, DateInput } from '@nextui-org/react';
import { CalendarDate } from "@internationalized/date";


export default function Resumen() {

  const dispatch = useAppDispatch();

  const bgColor = useColorModeValue("gray.800", "gray.800");
  const textColor = useColorModeValue("white", "white");
  const menuHoverBg = useColorModeValue("gray.700", "gray.700");

  const data = [
    { "name": "Enero", "Ventas": 4000, "Gastos": 2400 },
    { "name": "Febrero", "Ventas": 3000, "Gastos": 1398 },
    { "name": "Marzo", "Ventas": 2000, "Gastos": 5800 },
    { "name": "Abril", "Ventas": 2780, "Gastos": 3908 },
    { "name": "Mayo", "Ventas": 1890, "Gastos": 4800 },
    { "name": "Junio", "Ventas": 2390, "Gastos": 3800 },
    { "name": "Julio", "Ventas": 3490, "Gastos": 4300 },
    { "name": "Agosto", "Ventas": 3490, "Gastos": 4300 },
    { "name": "Septiembre", "Ventas": 3490, "Gastos": 4300 },
    { "name": "Octubre", "Ventas": 3490, "Gastos": 4300 },
    { "name": "Noviembre", "Ventas": 3490, "Gastos": 4300 },
    { "name": "Diciembre", "Ventas": 3490, "Gastos": 4300 },
    { "name": "Enero", "Ventas": 4000, "Gastos": 2400 },
    { "name": "Febrero", "Ventas": 3000, "Gastos": 1398 },
    { "name": "Marzo", "Ventas": 2000, "Gastos": 5800 },
    { "name": "Abril", "Ventas": 2780, "Gastos": 3908 },
    { "name": "Mayo", "Ventas": 1890, "Gastos": 4800 },
  ]

  const salesLoading = useSelector((state: RootState) => state.sales.loading)

  const [inputValue, setInputValue] = useState({
    type: "",
    from: "",
    to: "",
    branch: ""
  });

  useEffect(() => {
    dispatch(setTitle(Titles.Sales1))

  }, []);



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
          <DateInput size='sm' label={"Desde"} className="max-w-sm" />
        </div>

        <div className="">
          <DateInput size='sm' label={"Hasta"} className="max-w-sm" />
        </div>


        <Button className="bg-green-400 text-black" variant="shadow" onClick={() => { dispatch(getTickets({ dateFrom: '20240128', dateEnd: '20240628' })) }} isLoading={salesLoading}>
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
          <Stat>
            <StatLabel>Total en ventas</StatLabel>
            <StatNumber>$240.00</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        </div>

      </div>
    </div >
  )
}
