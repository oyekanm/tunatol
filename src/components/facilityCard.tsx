import React from 'react'

type Props = {
    img: string;
    text: string
}

export default function FacilityCard({ img, text }: Props) {
    return (
        <div style={{
            backgroundImage: `url(${img})`
        }} className="positive h-[250px] flex justify-center items-end bg-no-repeat bg-center">
            <span className="uppercase bg-white text-black w-1/2 text-center font-bold text-[1.6rem] p-1">
                {text}
            </span>
        </div>
    )
}
