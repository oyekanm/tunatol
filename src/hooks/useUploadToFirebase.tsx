"use client"

import { useState, useEffect } from 'react';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/config/firebase';
import axios from 'axios';
import { GetStorageToke } from '@/actions/authActions';
import useToast from './useToast';

interface UploadResult {
    downloadUrl: string;
    metadata: any;
}

interface UploadResponse {
    message: string;
    fileName: string;
    publicUrl: string;
    signedUrl: string;
}

const uploadToFirebase = async (file: any, rootFolder: string, onProgress?: any, imgFolder?: string,) => {
   
    const imageArray = file.name.split(".")
    imageArray[0] += Date.now()
    const fname = imageArray.join(".")
    const fileType = imageArray[1]

    // const metadata = {
    //     customMetadata: {
    //       'x-custom-token': token as string
    //     }
    //   };

    // console.log( fname)

    // use directly with firebase with auth rules
    const imageRef = ref(storage, `${rootFolder}/images/${fname}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress && onProgress(progress);
                // console.log(progress)
                // console.log(snapshot.bytesTransferred / snapshot.totalBytes)
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
                reject(error);
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
                resolve({
                    downloadUrl,
                    metadata: uploadTask.snapshot.metadata,
                });
            }
        );
    });
};

const useUploadToFirebase = () => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState<any>(null);

    const onProgress = (v: any) => {
        setProgress(v)
    }

    const handleUpload = async (files: any[], rootFolder: string,fileUpload?: any) => {
        setUploading(true);
        setProgress(0);
        setError(null);
        let newFiles = []

   

        try {
            for (let i = 0; i < files?.length; i++) {
                let imageFile = files[i];

                const result = await uploadToFirebase(imageFile, rootFolder,onProgress);
                newFiles.push(result)
            }
            const updatedImgFile = newFiles.map((r: any) => {
                return {
                    // name: r.name,
                    url: r.downloadUrl,
                    key: r.metadata?.fullPath,
                }
            })
            console.log(updatedImgFile, "loop")
            await fileUpload(updatedImgFile)
            setDownloadUrl(updatedImgFile)
        } catch (err: any) {
            setError(err);
        } finally {
            setUploading(false);
        }
    };

    return { uploading, progress, error, downloadUrl, handleUpload };
};

export default useUploadToFirebase;