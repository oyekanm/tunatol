import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex gap-8 items-center flex-col justify-center w-full px-4  h-[50rem] mx-auto max-w-[50rem]'>
            <p className='text-[2rem] font-semibold'>Not found – 404!</p>
            <Link href={`/`} className={`rounded-md bg-gray-100 px-8 py-3 text-[1.4rem] font-medium text-gray-800 transition hover:text-gray-800/75 sm:block`}>
                Go back to Home
            </Link>
        </div>
    )
}
