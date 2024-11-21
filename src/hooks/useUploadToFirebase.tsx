"use client"

import { useState, useEffect } from 'react';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/config/firebase';

interface UploadResult {
  downloadUrl: string;
  metadata: any;
}

const uploadToFirebase = async (file: any, rootFolder:string,onProgress?: any,imgFolder?:string,) => {
    const imageArray = file.name.split(".")
    imageArray[0] += Date.now()
    const fname = imageArray.join(".")
    // console.log( fname)
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

  const onProgress =(v:any)=>{
    setProgress(v)
}

  const handleUpload = async (files: any[],rootFolder:string ) => {
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
        setDownloadUrl(updatedImgFile)
    } catch (err:any) {
      setError(err);
    } finally {
      setUploading(false);
    }
  };

  return { uploading, progress, error, downloadUrl, handleUpload };
};

export default useUploadToFirebase;