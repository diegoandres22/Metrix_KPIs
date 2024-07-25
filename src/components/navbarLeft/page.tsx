'use client'

import React, { useEffect } from 'react'
import { Titles } from '../../variables';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

import { FaHome } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight, MdPayment } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";

export default function NavBar() {

  const title = useSelector((state: RootState) => state.titles);

  useEffect(() => {



  }, [title]);


  const getLinkClasses = (currentTitle: string) => title.title == currentTitle ? 'bg-white rounded-md flex  bg-opacity-10  gap-2 items-center px-2' : 'flex gap-2 items-center px-2';
  const getLinkClasses1 = (currentTitle: string) => title.title == currentTitle ? 'bg-white rounded-md flex  bg-opacity-10  gap-2 items-center ' : 'flex gap-2 items-center ';

  const getArrowClasses = () => 'text-xs';


  return (
    <div className='flex w-[20vw] h-screen bg-white bg-opacity-10 flex-col p-5 pt-20 gap-5 overflow-auto'>
      <Link
        href="/start" className={getLinkClasses1(Titles.start)}
      >
        <FaHome /> {Titles.start}
      </Link>

      <Accordion allowMultiple >
        <AccordionItem className='border-none'>
          <AccordionButton >
            <Box as='span' flex='1' textAlign='left' className=' flex gap-2 items-center'>
              <BsCashCoin /> {Titles.salesTitle}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel >
            <ul className='flex flex-col gap-4 mt-4 ' >
              <li >
                <Link
                  href="/sales/resumen"
                  className={` ${getLinkClasses(Titles.Sales1)} text-gray-400`}
                >
                  <MdKeyboardDoubleArrowRight className={getArrowClasses()} /> {Titles.Sales1}
                </Link>
              </li>
              <li >
                <Link
                  href="/sales/bill"
                  className={` ${getLinkClasses(Titles.Sales2)} text-gray-400`}
                >
                  <MdKeyboardDoubleArrowRight className={getArrowClasses()} />{Titles.Sales2}
                </Link>
              </li>

            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>


      <Accordion allowMultiple >
        <AccordionItem className='border-none'>
          <AccordionButton >
            <Box as='span' flex='1' textAlign='left' className=' flex gap-2 items-center' >
              <IoMdCart /> {Titles.BuyTitle}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel >
            <ul className='flex flex-col gap-4 mt-4 ' >
              <li  >
                <Link
                  href="/purchases/details"
                  className={` ${getLinkClasses(Titles.BuyDetail)} text-gray-400`}
                >
                  <MdKeyboardDoubleArrowRight className={getArrowClasses()} />  {Titles.BuyDetail}
                </Link>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion allowMultiple >
        <AccordionItem className='border-none'>
          <AccordionButton >
            <Box as='span' flex='1' textAlign='left' className=' flex gap-2 items-center'>
              <FaUsers />  {Titles.customersTitle}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel >
            <ul className='flex flex-col gap-4 mt-4 ' >
              <li  >
                <Link href="/customers/details" className={` ${getLinkClasses(Titles.customers1)} text-gray-400`}                >
                  <MdKeyboardDoubleArrowRight className={getArrowClasses()} />  {Titles.customers1}
                </Link>
              </li>


            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion allowMultiple >
        <AccordionItem className='border-none'>
          <AccordionButton >
            <Box as='span' flex='1' textAlign='left' className=' flex gap-2 items-center'>
              <MdPayment />  {Titles.paymentsTitle}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel >
            <ul className='flex flex-col gap-4 mt-4 ' >
              <li  >
                <Link href="/payments/metods" className={` ${getLinkClasses(Titles.payments1)} text-gray-400`}                >
                  <MdKeyboardDoubleArrowRight className={getArrowClasses()} />  {Titles.payments1}
                </Link>
              </li>


            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion allowMultiple >
        <AccordionItem className='border-none'>
          <AccordionButton >
            <Box as='span' flex='1' textAlign='left' className=' flex gap-2 items-center'>
              <SiHomeassistantcommunitystore />  {Titles.businessTitle}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel >
            <ul className='flex flex-col gap-4 mt-4 ' >
              <li  >
                <Link href="/business/status" className={` ${getLinkClasses(Titles.businessStatus)} text-gray-400`}                >
                  <MdKeyboardDoubleArrowRight className={getArrowClasses()} />  {Titles.businessStatus}
                </Link>
              </li>
              <li  >
                <Link href="/business/summary" className={` ${getLinkClasses(Titles.businessAuditSummary)} text-gray-400`}                >
                  <MdKeyboardDoubleArrowRight className={getArrowClasses()} />  {Titles.businessAuditSummary}
                </Link>
              </li><li  >
                <Link href="/business/audits" className={` ${getLinkClasses(Titles.businessAudit)} text-gray-400`}                >
                  <MdKeyboardDoubleArrowRight className={getArrowClasses()} />  {Titles.businessAudit}
                </Link>
              </li>

            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Link
        href="/products" className=' flex gap-2 items-center'
      >
        <IoFastFood /> {Titles.Fifth}
      </Link>

      <Link
        href="/promotions"
      >
        {Titles.Seventh}
      </Link>


    </div>
  );
}

