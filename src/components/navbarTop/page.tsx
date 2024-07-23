'use client'

import { Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from '@chakra-ui/react';
import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';



export default function navbarTop() {


    const title = useSelector((state: RootState) => state.titles)

    const bgColor = useColorModeValue("gray.800", "gray.800");
    const textColor = useColorModeValue("white", "white");
    const menuHoverBg = useColorModeValue("gray.700", "gray.700");


    return (
        <div className="">
            <div className="flex absolute w-screen h-[4em] bg-white bg-opacity-10 justify-between p-5 ">
                <p className=''>Metrix KPIs</p>
                <p className=''>{title.title}</p>

                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="light" >

                            <FaUserCircle className="text-4xl"></FaUserCircle>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Usuario"
                    >
                        <DropdownItem key="new">Perfil</DropdownItem>
                        <DropdownItem key="copy">Ajustes</DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger">
                            Cerrar sesión
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </div>
        </div>
    )
}
