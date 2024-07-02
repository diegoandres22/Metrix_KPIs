'use client'
import React, { useEffect } from 'react'
import { useAppDispatch } from '@/redux/services/hooks';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';

export default function Metodos() {


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTitle(Titles.Sales3))

  }, []);

  return (
    <div className='mt-[4em]'>yo soy Metodos</div>
  )
}

