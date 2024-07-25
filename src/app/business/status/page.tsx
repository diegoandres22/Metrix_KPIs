
"use client";

import { useAppDispatch } from '@/redux/services/hooks';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';
import React, { useEffect } from 'react'

export default function Status() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTitle(Titles.businessStatus))

    }, []);

    
    return (
        <div className='mt-[4em]'>
            <h1>Hola yo soy estado
            </h1>
        </div>
    )
}
