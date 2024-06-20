import React from 'react'
import { FaUserCircle } from "react-icons/fa";



export default function dNavbarTop() {
    return (
        <div className="">
            <div className="flex absolute w-screen h-[10vh] bg-white bg-opacity-10 justify-between p-5 ">
                <p className=''>Metrix KPIs</p>
                <p className=''>TITULO</p>
                <p className=''>
                    <FaUserCircle></FaUserCircle>
                </p>

            </div>
        </div>
    )
}
