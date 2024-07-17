"use client"

import { access } from 'fs'
import React, {useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { convertFileToUrl } from '@/lib/utils'


// I'm using react-dropzone to handle file uploads

type fileUpoadProps = {
    files: File[] | undefined 
    onChange: (files: File[]) => void
}
const FileUpload = ({files, onChange}:fileUpoadProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    },[])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {
       files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="uploaded file"
          height={1000}
          width={1000}
          className="max-h-[400px] overflow-hidden object-cover"

        />
       ):(
        <>
          <Image
            src="/assets/icons/upload.svg"
            alt="upload file"
            height={40}
            width={40}
          />
          <div className='text-14-regular file-upload_label'>
            <p><span className="text-green-500 font-semibold">Click to upload</span> or drag and drop</p>
            <p className='text-12-regular'>SVG, PNG, JPG, GIF or PDF (max 800x400px)</p>
          </div>
        </>
       )
      }
    </div>
  )
}

export default FileUpload
