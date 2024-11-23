"use client"

import { Button } from '@/components/ui/button';
import { useToast, useUploadToFirebase } from '@/hooks';
import { CloudUpload } from 'lucide-react';
import React, { useState } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone';


type Props = {
    restName?: string,
    fileUpload?: any,
    setOpen?: any,
    rootFolder: string,
}

export default function UploadImageComp({ restName, fileUpload, setOpen, rootFolder }: Props) {
    const toast = useToast()
    const [files, setFiles] = useState([])
    const {  handleUpload, progress, uploading } = useUploadToFirebase()
    const { getRootProps, getInputProps } = useDropzone({
        // accept: 'image/*',
        onDrop: (acceptedFiles: any) => {
            setFiles(acceptedFiles);
        }
    });

    
    const upload = async () => {
        if (!files) return;
        toast({
            status: 'normal',
            text: 'Uploading, lease wait ....',
            duration:7000,
        });
        await handleUpload(files,rootFolder, fileUpload)
        
        setFiles([])
        // await fileUpload(downloadUrl)
        // console.log(downloadUrl, "url")
    }

    return (
        <div className='border-2 w-full h-full p-4 grid items-center justify-center'>
            {/* <input type="file" name="" id="" onChange={e=>console.log(e?.target?.files[0])}/> */}
            <div className='grid gap-4 cursor-pointer'>
                <div {...getRootProps({ className: 'dropzone grid' })}>
                    <input {...getInputProps()} disabled={uploading} />
                    <CloudUpload className='w-12 h-12 mx-auto text-slate-700' />
                    <p className='text-[1.4rem] font-medium text-slate-700'>Drag & drop your image here</p>
                    {files.length === 0 && <Button disabled={uploading} type='button'>Choose Files</Button>}
                </div>
                {files.length > 0 && <Button type='button' disabled={uploading} onClick={upload}>{uploading
                    ? `${progress.toFixed(0)}%` : `Upload file`
                } </Button>}
            </div>
        </div>
    )
}
