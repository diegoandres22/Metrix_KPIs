
"use client";

import { useAppDispatch } from '@/redux/services/hooks';
import { setTitle } from '@/redux/slices/titleSlice';
import { Titles } from '@/variables';
import { Card, CardBody, CardFooter, CardHeader, Divider, Link, Image, Chip, Progress } from '@nextui-org/react';
import React, { useEffect } from 'react'

export default function Status() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTitle(Titles.businessStatus))

    }, []);


    return (
        <div className='mt-[5em] w-[80vw] flex flex-col gap-4'>
            <div className=" flex p-2 justify-evenly">

                <Card className="w-[400px]">
                    <CardHeader className="flex gap-3">
                        <iframe src="https://donmanuelgrill-my.sharepoint.com/personal/it_donmanuelgrill_com/_layouts/15/embed.aspx?UniqueId=dd5d5289-4f0e-4c84-8f16-287b63c53aaa" width="40" height="40" allowFullScreen title="makai" className='rounded-lg'></iframe>
                        <div className="flex flex-col w-full">
                            <div className="flex w-full justify-between">
                                <p className="">Makai</p>
                                <Chip color="default" variant="dot"> <p className='text-red-700'> Cerrado</p> </Chip>
                            </div>
                            <p className=" ">Casco Historico</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p> <b>Encargado : </b>Carmen </p>
                        <p><b>Ubicación : </b><Link
                            isExternal
                            showAnchorIcon
                            href="https://github.com/nextui-org/nextui"
                        >
                            Mapa
                        </Link> </p>

                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Progress size="lg" aria-label="Progreso..." value={0} />

                    </CardFooter>
                </Card>
                <Card className="w-[400px]">
                    <CardHeader className="flex gap-3">
                        <iframe src="https://donmanuelgrill-my.sharepoint.com/personal/it_donmanuelgrill_com/_layouts/15/embed.aspx?UniqueId=849c1de9-5a2d-4766-ad5c-79d79609c608" width="40" height="40" allowFullScreen title="LogoDMG" className='rounded-lg'>
                        </iframe>
                        <div className="flex flex-col w-full">
                            <div className="flex w-full justify-between">
                                <p className="">Don Manuel Grill</p>
                                <Chip color="success" variant="dot"><p className='text-green-600'> Abierto</p></Chip>
                            </div>
                            <p className=" ">Casco historico</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p> <b>Encargado : Daisy</b></p>
                        <p><b>Ubicación : <Link
                            isExternal
                            showAnchorIcon
                            href="https://github.com/nextui-org/nextui"
                        >
                            Mapa
                        </Link></b></p>

                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Progress size="lg" aria-label="Progreso..." value={50} />
                    </CardFooter>
                </Card>
            </div>
            <div className=" flex p-2 justify-evenly">



                <Card className="w-[400px]">
                    <CardHeader className="flex gap-3">
                        <iframe src="https://donmanuelgrill-my.sharepoint.com/personal/it_donmanuelgrill_com/_layouts/15/embed.aspx?UniqueId=849c1de9-5a2d-4766-ad5c-79d79609c608" width="40" height="40" allowFullScreen title="LogoDMG" className='rounded-lg'>
                        </iframe>
                        <div className="flex flex-col w-full">
                            <div className="flex w-full justify-between">
                                <p className="">Especialidades brisas y mar</p>
                                <Chip color="success" variant="dot"><p className='text-green-600'> Abierto</p></Chip>
                            </div>
                            <p className=" ">Maiquetia</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p> <b>Encargado : Geisy</b></p>
                        <p><b>Ubicación : <Link
                            isExternal
                            showAnchorIcon
                            href="https://github.com/nextui-org/nextui"
                        >
                            Mapa
                        </Link></b></p>

                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Progress size="lg" aria-label="Progreso..." value={80} />
                    </CardFooter>
                </Card>

                <Card className="w-[400px]">
                    <CardHeader className="flex gap-3">
                        <iframe src="https://donmanuelgrill-my.sharepoint.com/personal/it_donmanuelgrill_com/_layouts/15/embed.aspx?UniqueId=dd5d5289-4f0e-4c84-8f16-287b63c53aaa" width="40" height="40" allowFullScreen title="makai" className='rounded-lg'></iframe>
                        <div className="flex flex-col w-full">
                            <div className="flex w-full justify-between">
                                <p className="">COFFE Macuto</p>
                                <Chip color="default" variant="dot"> <p className='text-red-700'> Cerrado</p> </Chip>
                            </div>
                            <p className=" ">Macuto</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p> <b>Encargado : </b>yoimer </p>
                        <p><b>Ubicación : </b><Link
                            isExternal
                            showAnchorIcon
                            href="https://github.com/nextui-org/nextui"
                        >
                            Mapa
                        </Link> </p>

                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Progress size="lg" aria-label="Progreso..." value={0} />

                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
