import { Spinner } from "@nextui-org/react";

export default function Loading() {
    return (
        <div className="flex absolute w-full h-full ">
            <div className="flex absolute w-full h-full  bg-black opacity-30 z-10"></div>
            <Spinner size="lg" className="flex m-auto z-11 " />

        </div>
    );
}
