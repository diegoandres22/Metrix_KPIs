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
  const getLinkClasses = (currentTitle: string) => title.title === currentTitle ? 'text-xl font-bold text-buttomClick' : '';

  return (
    <div className='flex w-[20vw] h-screen bg-white bg-opacity-10 flex-col p-5 pt-20 gap-5'>
      <Link
        href="/inicio"
        onClick={() => dispatch(setTitle(Titles.First))}
        className={getLinkClasses(Titles.First)}
      >
        {Titles.First}
      </Link>

      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Ventas
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel className=''>
            <ul className='flex flex-col gap-4 mt-4 ml-2'>
              <li>
                <Link
                  href="/ventas/resumen"
                  onClick={() => dispatch(setTitle(Titles.Sales1))}
                  className={getLinkClasses(Titles.Sales1)}
                >
                  {Titles.Sales1}
                </Link>
              </li>
              <li>
                <Link
                  href="/ventas/actual"
                  onClick={() => dispatch(setTitle(Titles.Sales2))}
                  className={getLinkClasses(Titles.Sales2)}
                >
                  {Titles.Sales2}
                </Link>
              </li>
              <li>
                <Link
                  href="/ventas/metodos"
                  onClick={() => dispatch(setTitle(Titles.Sales3))}
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
        href="/compras"
        onClick={() => dispatch(setTitle(Titles.Third))}
        className={getLinkClasses(Titles.Third)}
      >
        {Titles.Third}
      </Link>

      <Link
        href="/metricas"
        onClick={() => dispatch(setTitle(Titles.Fourth))}
        className={getLinkClasses(Titles.Fourth)}
      >
        {Titles.Fourth}
      </Link>

      <Link
        href="/productos"
        onClick={() => dispatch(setTitle(Titles.Fifth))}
        className={getLinkClasses(Titles.Fifth)}
      >
        {Titles.Fifth}
      </Link>

      <Link
        href="/clientes"
        onClick={() => dispatch(setTitle(Titles.Sixth))}
        className={getLinkClasses(Titles.Sixth)}
      >
        {Titles.Sixth}
      </Link>

      <Link
        href="/promociones"
        onClick={() => dispatch(setTitle(Titles.Seventh))}
        className={getLinkClasses(Titles.Seventh)}
      >
        {Titles.Seventh}
      </Link>

      <Link
        href="/libro_rojo"
        onClick={() => dispatch(setTitle(Titles.Eighth))}
        className={getLinkClasses(Titles.Eighth)}
      >
        {Titles.Eighth}
      </Link>

      <Link
        href="/auditorias"
        onClick={() => dispatch(setTitle(Titles.Nineth))}
        className={getLinkClasses(Titles.Nineth)}
      >
        {Titles.Nineth}
      </Link>
    </div>
  );
}




// 'use client'

// import React from 'react'
// import { Titles } from '../../variables';
// import Link from 'next/link';
// import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react';
// import { useAppDispatch } from '@/redux/services/hooks';
// import { setTitle } from "@/redux/slices/titleSlice"
// import { RootState } from '@/redux/store';
// import { useSelector } from 'react-redux';

// export default function NavBar() {

//   const title = useSelector((state: RootState) => state.titles)
//   const dispatch = useAppDispatch();

//   return (
//     <div className='flex w-[20vw] h-screen bg-white bg-opacity-10 flex-col p-5 pt-20 gap-5'>

//       {title.title == Titles.First ? <Link href="/inicio" onClick={() => dispatch(setTitle(Titles.First))} className='text-xl font-bold text-buttomClick' >{Titles.First} </Link> : <Link href="/inicio" onClick={() => dispatch(setTitle(Titles.First))}>{Titles.First}</Link>
//       }

//       <Accordion allowMultiple>
//         <AccordionItem>

//           <AccordionButton>
//             <Box as='span' flex='1' textAlign='left'>
//               Ventas
//             </Box>
//             <AccordionIcon />
//           </AccordionButton>

//           <AccordionPanel className=''>
//             <ul className='flex flex-col gap-4 mt-4 ml-10'>

//               {title.title == Titles.Sales1 ? <li>
//                 <Link href="/ventas/resumen" onClick={() => dispatch(setTitle(Titles.Sales1))} className='text-xl font-bold text-buttomClick'>
//                   {Titles.Sales1}
//                 </Link>
//               </li> : <li>
//                 <Link href="/ventas/resumen" onClick={() => dispatch(setTitle(Titles.Sales1))} >
//                   {Titles.Sales1}
//                 </Link>
//               </li>}


//               {title.title == Titles.Sales1}
//               <li><Link href="/ventas/actual" onClick={() => dispatch(setTitle(Titles.Sales2))}>{Titles.Sales2}</Link></li>

//               {title.title == Titles.Sales1}
//               <li><Link href="/ventas/metodos" onClick={() => dispatch(setTitle(Titles.Sales3))}>{Titles.Sales3}</Link></li>
//             </ul>
//           </AccordionPanel>
//         </AccordionItem>
//       </Accordion>

//       {title.title == Titles.Sales1}
//       <Link href="/compras" onClick={() => dispatch(setTitle(Titles.Third))}>{Titles.Third}</Link>

//       {title.title == Titles.Sales1}
//       <Link href="/metricas" onClick={() => dispatch(setTitle(Titles.Fourth))}>{Titles.Fourth}</Link>

//       {title.title == Titles.Sales1}
//       <Link href="/productos" onClick={() => dispatch(setTitle(Titles.Fifth))}>{Titles.Fifth}</Link>

//       {title.title == Titles.Sales1}
//       <Link href="/clientes" onClick={() => dispatch(setTitle(Titles.Sixth))}>{Titles.Sixth}</Link>

//       {title.title == Titles.Sales1}
//       <Link href="/promociones" onClick={() => dispatch(setTitle(Titles.Seventh))}>{Titles.Seventh}</Link>

//       {title.title == Titles.Sales1}
//       <Link href="libro_rojo" onClick={() => dispatch(setTitle(Titles.Eighth))}>{Titles.Eighth}</Link>

//       {title.title == Titles.Sales1}
//       <Link href="/auditorias" onClick={() => dispatch(setTitle(Titles.Nineth))}>{Titles.Nineth}</Link>

//     </div>
//   )
// }
