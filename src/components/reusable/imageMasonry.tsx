import React from 'react'
import Modal from './Modal'

export default function ImageMasonry() {
    return (
        <div className="Container relative py-10 lg:py-14 mx-auto h-full">
            <div className="grid sm:grid-cols-12 gap-6 h-full">
                <div className="col-span-7 h-full">
                    <div className="h-full rounded-tl-lg rounded-bl-lg rounded-xl overflow-hidden">
                        <img className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full h-full object-cover" src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Masonry Cards Image" />
                    </div>
                </div>
                <div className="col-span-5 grid grid-cols-2 gap-4 h-full">
                        <div className="h-full overflow-hidden">
                            <img className="h-full group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover" src="https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Masonry Cards Image" />
                        </div>
                        <div className="h-full overflow-hidden">
                            <img className="h-full group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover" src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Masonry Cards Image" />
                        </div>
                        <div className="h-full overflow-hidden">
                            <img className="h-full group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover" src="https://images.unsplash.com/photo-1598929438701-ef29ab0bb61a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Masonry Cards Image" />
                        </div>
                        <div className="h-full overflow-hidden">
                            <img className="h-full group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover" src="https://images.unsplash.com/photo-1467043153537-a4fba2cd39ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Masonry Cards Image" />
                        </div>
                </div>
                <div className='absolute right-8 bottom-8'>
                    <Modal trigger='show all photos'>

                    </Modal>
                </div>

            </div>
        </div>
    )
}
