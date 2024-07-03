'use client'
import React, { useEffect } from 'react';

import { useAppDispatch } from '@/redux/services/hooks';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';

export default function Actual() {


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTitle(Titles.Sales2))

  }, []);

  return (
    <div className='mt-[4em]'>
      <h1>Yo soy Actual</h1>

    </div>
  );
}
