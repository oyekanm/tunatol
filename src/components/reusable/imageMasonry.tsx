import React from 'react'
import Modal from './Modal'
import Image from 'next/image';
import ImageCarousel from './imageCarousel';

type Props = {
    files: Image[];
}

export default function ImageMasonry({ files }: Props) {
    // console.log(files.slice(1), files)
    return (
        <div className="Container relative py-8 mx-auto h-full">
            <div className="grid sm:grid-cols-12 gap-6 h-full">
                <div className="col-span-6 h-full">
                    <div className="h-full rounded-tl-[10px] rounded-bl-[10px] rounded-xl overflow-hidden">
                        <Image
                            src={files[0].url}
                            className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full h-full object-cover"
                            alt={files[0].key}
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
                <div className="col-span-3 grid gap-4 h-full">
                    {
                        files.slice(1,3).map((file, index) => {
                            return (
                                <div key={index} className={`h-full overflow-hidden  `}>
                                    <Image
                                        src={file.url}
                                        className="h-full group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                                        alt={file.key}
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-span-3 grid gap-4 h-full">
                    {
                        files.slice(3).map((file, index) => {
                            return (
                                <div key={index} className={`h-full overflow-hidden rounded-tr-[10px] rounded-br-[10px]  `}>
                                    <Image
                                        src={file.url}
                                        className="h-full group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                                        alt={file.key}
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='absolute right-16 bottom-12'>
                    <Modal trigger='show all photos' triggerclx="'bg-white text-gray-700 border-2 '">
                        <div className='h-[45rem]'>
                            <ImageCarousel files={files} moveBtn={false} />
                        </div>
                    </Modal>
                </div>

            </div>
        </div>
    )
}
