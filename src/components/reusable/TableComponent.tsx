"use client"
import { useToast } from '@/hooks';
import Link from 'next/link';
import React, { useState } from 'react'

type Props = {
    column: column[];
    data: any[];
    href?: string;
    hrefText?: string;
    path?: string,
    pathText?: string;
    headerText?: string;
    check?: boolean;
    children?:React.ReactNode,
    deleteChecked?:any
}






export default function TableComponent({ column, data, hrefText, path, href, pathText, headerText, check,children,deleteChecked }: Props) {
    const toast = useToast()
    const [ids, setIds] = useState<string[]>([])
    const allIds = data.map((pr: any) => pr.id)
    const checked = (id: string) => {
        return ids.includes(id)
    }
    const allChecked = () => {
        // ids.some
        return data.every((pr: any) => {
            return ids.includes(pr.id)
        })
    }
    const handleChange = (id: string) => {
        setIds(prev => {
            if (checked(id)) {
                const newIds = prev.filter(ids => ids !== id);
                return newIds
            }
            return [...prev, id]
        })
    }
    // console.log(data.length  , ids.length)
    const addAllIds = (id: string[]) => {
        // console.log(allChecked())
        if(data.length  === ids.length){
            setIds([])
            return;
        }
        setIds(id)
    }
    const deleteRecord = ()=>{
        toast({
            status: 'warning',
            text: 'Are you sure you want to delete?',
            clickText:"YES",
            click:()=>deleteChecked(ids),
            duration:30000,
        });
        
    }

    return (
        // <!-- Table Section -->
        <div className="max-w-[136rem] mx-auto">
            {/* <!-- Card --> */}
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            {/* <!-- Header --> */}
                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                <div>
                                    <p className="text-[2rem] font-semibold text-gray-800 dark:text-neutral-200">
                                        {headerText}
                                    </p>
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-x-4">
                                        {ids.length > 0 && <button onClick={deleteRecord} className="py-2 px-6 inline-flex items-center bg-destructive text-white gap-x-2 text-[1.2rem] font-medium rounded-lg border border-gray-200   shadow-sm hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none focus:outline-none dark:bg-destructive dark:border-neutral-700 dark:text-neutral-300">
                                            Delete ({ids.length})
                                        </button>}
                                        {/* <!-- Input --> */}
                                       
                                        {children && children}
                                        {hrefText && (
                                            <Link
                                                className="py-2 px-6 inline-flex items-center gap-x-2 text-[1.2rem] font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                                href={`${href}`}>
                                                {/* <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg> */}
                                                {hrefText}
                                            </Link>)}
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End Header --> */}

                            {/* <!-- Table --> */}
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead className="bg-gray-50 dark:bg-neutral-800 py-4">
                                    <tr>
                                        {check && (
                                            <th scope="col" className="ps-6 py-3 text-start">
                                                <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                                                    <input type="checkbox" checked={allChecked()} onChange={() => addAllIds(allIds)} className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-main" />
                                                    <span className="sr-only">Checkbox</span>
                                                </label>
                                            </th>)}
                                        {
                                            column.map(column => {
                                                return (
                                                    <th key={column.key} scope="col" className="ps-4 pe-6 py-3 text-start">
                                                        <div className="flex items-center gap-x-2">
                                                            <span className="text-[1.2rem] font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                                {column.label}
                                                            </span>
                                                        </div>
                                                    </th>
                                                )
                                            })
                                        }
                                        {pathText && <th scope="col" className="px-6 py-3 text-end"></th>}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {
                                        data?.map((row: any) => {
                                            const name = row?.name?.split(" ").join("-");
                                            return (
                                                <tr>
                                                    {check && (
                                                        <td className="size-px whitespace-nowrap">
                                                            <div className="ps-6 py-3">
                                                                <label htmlFor="hs-at-with-checkboxes-1" className="flex">
                                                                    <input type="checkbox"
                                                                        checked={checked(row.id)}
                                                                        onChange={() => handleChange(row.id)}
                                                                        className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-1" />
                                                                    <span className="sr-only">Checkbox</span>
                                                                </label>
                                                            </div>
                                                        </td>)}
                                                    {column.map(column => {
                                                        // const name = column?.accessor
                                                        // console.log(row["CollectionType"][column.accessor])
                                                        return (
                                                            <td className="h-px w-72 whitespace-nowrap">
                                                                <div className="px-4 py-3">
                                                                    {
                                                                        column.render ? column.render(row[column.key]) :
                                                                            <span className="block text-[1.1rem] font-semibold text-gray-800 dark:text-neutral-200"
                                                                            >
                                                                                {column?.accessor ? row[column.key][column?.accessor] : row[column.key]}
                                                                            </span>}
                                                                </div>
                                                            </td>
                                                        )
                                                    })}
                                                    {pathText && <td className="size-px whitespace-nowrap">
                                                        <div className="px-6 py-1.5">
                                                            <Link
                                                                className="inline-flex items-center gap-x-1 text-[1.1rem] text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                                                                href={`${path}/${name}`}>
                                                                {pathText}
                                                            </Link>
                                                        </div>
                                                    </td>}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            {/* <!-- End Table --> */}

                            {/* <!-- Footer --> */}
                            {data.length > 15 && <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                                <div>
                                    <p className="text-[1.1rem] text-gray-600 dark:text-neutral-400">
                                        <span className="font-semibold  text-gray-800 dark:text-neutral-200">{data.length}</span> results
                                    </p>
                                </div>

                                <div>
                                    <div className="inline-flex items-center gap-x-2">
                                        <button disabled={data.length < 15} type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-[1.2rem] font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                            Prev
                                        </button>

                                        <button disabled={data.length < 15} type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-[1.2rem] font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                            Next
                                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>}
                            {/* <!-- End Footer --> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Card --> */}
        </div>
    )
}
