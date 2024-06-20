import React from 'react'
import { Titles } from '../../variables';


export default function NavBar() {
  return (
    <div className='flex w-[20vw] h-screen bg-white bg-opacity-10 flex-col p-5 pt-20 gap-5'>
        <a href="/inicio">{Titles.First}</a>
        <a href="/ventas">{Titles.Second}</a>
        <a href="/compras">{Titles.Third}</a>
        <a href="/metricas">{Titles.Fourth}</a>
        <a href="">{Titles.Fifth}</a>
        <a href="">{Titles.Sixth}</a>
        <a href="">{Titles.Seventh}</a>
        <a href="">{Titles.Eighth}</a>
        <a href="">{Titles.Nineth}</a>

    </div>
  )
}
