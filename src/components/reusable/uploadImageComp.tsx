"use client"

import { Button } from '@/components/ui/button';
import { useUploadToFirebase } from '@/hooks';
import { CloudUpload } from 'lucide-react';
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';


type Props = {
    restName?: string,
    fileUpload?: any,
    setOpen?: any,
    rootFolder:string,
}

export default function UploadImageComp({ restName, fileUpload, setOpen,rootFolder }: Props) {
    const [files, setFiles] = useState([])
    const {downloadUrl,handleUpload,progress,uploading} = useUploadToFirebase()
    const { getRootProps, getInputProps } = useDropzone({
        // accept: 'image/*',
        onDrop: (acceptedFiles: any) => {
            // console.log(acceptedFiles)
            setFiles(acceptedFiles);
        }
    });

   

    const upload = async () => {
        if (!files) return;

        handleUpload(files,rootFolder)
        
        setFiles([])
        await fileUpload(downloadUrl)
    }



    // console.log(, imageArray)
    return (
        <div className='border-2 w-full h-full p-4 grid items-center justify-center'>
            <div className='grid gap-4 cursor-pointer'>
                <div {...getRootProps({ className: 'dropzone grid' })}>
                    <input {...getInputProps()} />
                    <CloudUpload className='w-12 h-12 mx-auto text-slate-700' />
                    <p className='text-[1.4rem] font-medium text-slate-700'>Drag & drop your image here</p>
                    {files.length ===0 && <Button type='button'>Choose Files</Button>}
                </div>
                {files.length>0 && <Button onClick={upload}>{uploading
                    ? `${progress.toFixed(0)}%` : `Upload file`
                } </Button>}
            </div>
        </div>
    )
}
