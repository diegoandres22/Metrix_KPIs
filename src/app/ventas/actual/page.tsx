'use client'
import React from 'react';
import { Button } from '@chakra-ui/react';
import { getTickets } from '@/redux/services/saleService'

import { useAppDispatch } from '@/redux/services/hooks';

export default function Actual() {
  const dispatch = useAppDispatch();


  const handleClick = () => {
    dispatch(getTickets());
  };

  return (
    <div className='mt-[4em]'>
      <h1>Yo soy Actual</h1>
      Cargar Ventas
      <Button colorScheme='teal' variant='outline' onClick={handleClick}>
        Peticion API
      </Button>
    </div>
  );
}
