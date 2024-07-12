'use client'

import React from 'react'
import { Titles } from '../../variables';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export default function NavBar() {

  const title = useSelector((state: RootState) => state.titles);
  const getLinkClasses = (currentTitle: string) => title.title == currentTitle ? 'bg-white rounded-md flex justify-center bg-opacity-20 px-6' : 'flex justify-center ';


  return (
    <div className='flex w-[20vw] h-screen bg-white bg-opacity-10 flex-col p-5 pt-20 gap-5 '>
      <Link
        href="/start"
      >
        {Titles.First}
      </Link>

      <Accordion allowMultiple >
        <AccordionItem className='border-none'>
          <AccordionButton >
            <Box as='span' flex='1' textAlign='left' >
              {Titles.salesTitle}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel >
            <ul className='flex flex-col gap-4 mt-4' >
              <li  className='flex justify-center'>
                <Link
                  href="/ventas/resumen"
                  className={getLinkClasses(Titles.Sales1) }
                >
                  {Titles.Sales1}
                </Link>
              </li>
              <li className='flex justify-center'>
                <Link
                  href="/ventas/bill"
                  className={getLinkClasses(Titles.Sales2)}
                >
                  {Titles.Sales2}
                </Link>
              </li>
              <li className=''>
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

      <Accordion allowMultiple >
        <AccordionItem className='border-none'>
          <AccordionButton >
            <Box as='span' flex='1' textAlign='left' >
              {Titles.BuyTitle}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel >
            <ul className='flex flex-col gap-4 mt-4 ml-4' >
              <li  >
                <Link
                  href="/purchases"
                  
                >
                  {Titles.BuyDetail}
                </Link>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion allowMultiple >
        <AccordionItem className='border-none'>
          <AccordionButton >
            <Box as='span' flex='1' textAlign='left' >
              {Titles.customersTitle}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel >
            <ul className='flex flex-col gap-4 mt-4 ml-4' >
              <li  >
                <Link href="/customers/details" className={getLinkClasses(Titles.customers1)}                >
                  {Titles.customers1}
                </Link>
              </li>


            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Link
        href="/products"
      >
        {Titles.Fifth}
      </Link>

      <Link
        href="/promotions"
      >
        {Titles.Seventh}
      </Link>

      <Link
        href="/audits"
      >
        {Titles.Nineth}
      </Link>
    </div>
  );
}

