import Image from 'next/image';
import Link from 'next/link';
import { Button } from './reusable';

type Props = {
    img: string;
    text?: string;
    title?: string
}

export default function RoomDescComp({ img, text, title }: Props) {
    return (
        <div className="grid sm:grid-cols-2 gap-4 mt-[5rem]">
            <div className="order-2 sm:order-1 flex flex-col justify-center gap-4">
                <p className={`text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-bol`}>
                    {title}
                </p>
                <p className={`text-[2rem]`}>
                    {text}
                </p>
                <Link href={"/rooms"}>
                    <Button text='Explore' clx={`text-[2rem] text-white h-16 w-1/2 mx-auto`} />
                </Link>
            </div>
            <div className="order-1 sm:order-2  sm:h-[350px]">
                <Image
                    src={img}
                    alt={img}
                    width={300}
                    height={300}
                    style={{ objectFit: "cover", height: "100%", width: "100%" }}
                />
            </div>
        </div>
    )
}
