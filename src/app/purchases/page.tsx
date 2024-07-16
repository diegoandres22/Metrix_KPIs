'use client'

import React, { useEffect } from 'react'
import { useAppDispatch } from '@/redux/services/hooks';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';

export default function Purchases() {

    
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTitle(Titles.BuyDetail))


    }, []);


    return (
        <div className='mt-[4em]'>
            <h1>Hola yo soy Compras
            </h1>
        </div>
    )
}
