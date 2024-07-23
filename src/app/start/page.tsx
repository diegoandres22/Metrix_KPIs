"use client";


import { useAppDispatch } from '@/redux/services/hooks';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';
import React, { useEffect } from 'react'

export default function Inicio() {


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTitle(Titles.start))

    }, []);


    return (
        <div className='mt-[4em]'>

            <p>Hola yo soy inicio</p>
        </div>
    )
}
