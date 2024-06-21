'use client'

import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";



export default function navbarTop() {


    const title = useSelector((state:RootState)=> state.titles)


    return (
        <div className="">
            <div className="flex absolute w-screen h-[4em] bg-white bg-opacity-10 justify-between p-5 ">
                <p className=''>Metrix KPIs</p>
                <p className=''>{title.title}</p>

                <Menu >
                    <MenuButton>
                        <FaUserCircle className="text-4xl"></FaUserCircle>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Perfil</MenuItem>
                        <MenuItem>Ajustes</MenuItem>
                        <MenuItem>Cerrar sesión</MenuItem>
                    </MenuList>
                </Menu>


            </div>
        </div>
    )
}
