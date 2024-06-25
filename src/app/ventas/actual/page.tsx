'use client'
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@chakra-ui/react';

export default function Actual() {
  const dispatch = useDispatch();



  // const handleClick = () => {
  //   dispatch(loadSales('20240401', '20240430'));
  // };

  return (
    <div className='mt-[4em]'>
      <h1>Yo soy Actual</h1>
      Cargar Ventas
      <Button colorScheme='teal' variant='outline' onClick={() => alert("hola")}>
        alerta
      </Button>
    </div>
  );
}
