'use client'

import React from 'react'
import { Titles } from '../../variables';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react';
import { useAppDispatch } from '@/redux/services/hooks';
import { setTitle } from "@/redux/slices/titleSlice"
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export default function NavBar() {

  const title = useSelector((state: RootState) => state.titles);
  const dispatch = useAppDispatch();
  const getLinkClasses = (currentTitle: string) => title.title === currentTitle ? 'font-extrabold text-buttomClick' : '';


  return (
    <div className='flex w-[20vw] h-screen bg-white bg-opacity-10 flex-col p-5 pt-20 gap-5 '>
      <Link
        href="/start"
        className={getLinkClasses(Titles.First)}
      >
        {Titles.First}
      </Link>

      <Accordion allowMultiple >
        <AccordionItem className='border-none'>
          <AccordionButton >
            <Box as='span' flex='1' textAlign='left' >
              Ventas
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel >
            <ul className='flex flex-col gap-4 mt-4 ml-2' >
              <li  >
                <Link
                  href="/ventas/resumen"
                  className={getLinkClasses(Titles.Sales1)}
                >
                  {Titles.Sales1}
                </Link>
              </li>
              <li>
                <Link
                  href="/ventas/actual"
                  className={getLinkClasses(Titles.Sales2)}
                >
                  {Titles.Sales2}
                </Link>
              </li>
              <li>
                <Link
                  href="/ventas/metodos"
                  className={getLinkClasses(Titles.Sales3)}
                >
                  {Titles.Sales3}
                </Link>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Link
        href="/purchases"
        className={getLinkClasses(Titles.Third)}
      >
        {Titles.Third}
      </Link>

      <Link
        href="/metrics"
        className={getLinkClasses(Titles.Fourth)}
      >
        {Titles.Fourth}
      </Link>

      <Link
        href="/products"
        className={getLinkClasses(Titles.Fifth)}
      >
        {Titles.Fifth}
      </Link>

      <Link
        href="/customers"
        className={getLinkClasses(Titles.Sixth)}
      >
        {Titles.Sixth}
      </Link>

      <Link
        href="/promotions"
        className={getLinkClasses(Titles.Seventh)}
      >
        {Titles.Seventh}
      </Link>

      <Link
        href="/audits"
        className={getLinkClasses(Titles.Nineth)}
      >
        {Titles.Nineth}
      </Link>
    </div>
  );
}

