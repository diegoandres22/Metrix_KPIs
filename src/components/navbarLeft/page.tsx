import React from 'react'
import { Titles } from '../../variables';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react';

export default function NavBar() {
  return (
    <div className='flex w-[20vw] h-screen bg-white bg-opacity-10 flex-col p-5 pt-20 gap-5'>

      <Link href="/inicio">{Titles.First}</Link>
      <Accordion allowMultiple>

        <AccordionItem>

          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Ventas
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel className=''>
            <ul className='flex flex-col gap-4 mt-4 ml-10'>
              <li><Link href="/ventas/resumen">Resumen de ventas</Link></li>
              <li><Link href="/ventas/actual">Ventas en tiempo real</Link></li>
              <li><Link href="/ventas/metodos">Metodos de pago</Link></li>
            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Link href="/compras">{Titles.Third}</Link>
      <Link href="/metricas">{Titles.Fourth}</Link>
      <Link href="/productos">{Titles.Fifth}</Link>
      <Link href="/clientes">{Titles.Sixth}</Link>
      <Link href="/promociones">{Titles.Seventh}</Link>
      <Link href="libro_rojo">{Titles.Eighth}</Link>
      <Link href="/auditorias">{Titles.Nineth}</Link>

    </div>
  )
}
