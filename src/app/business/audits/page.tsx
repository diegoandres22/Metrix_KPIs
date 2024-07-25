

"use client";

import { useAppDispatch } from '@/redux/services/hooks';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';
import React, { useEffect } from 'react'

export default function Audits() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTitle(Titles.businessAudit))

    }, []);


    return (
        <div className='mt-[4em]'>
            <h1>Hola yo soy Auditorias
            </h1>
        </div>
    )
}
