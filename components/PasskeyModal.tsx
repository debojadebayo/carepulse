"use client"

import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  
import Image from 'next/image'  
import { usePathname, useRouter } from 'next/navigation'
import { error } from 'console'
import { decryptKey, encryptKey } from '@/lib/utils'



// set router to push to the home page with the home button 


//passkey 
//import input OTP from shadcn
//set state for passkey so that it can keep what the client enters 
//style the passkeys 
//set the error message for the passkey
//set validation for the passkey using the validatePasskey function-- checks whether the passkey the client has entered is equal to NEXT-PUBLIC PASSKEY 
//use localStorage to save the passkey.. First encrypt the passkey and then pass the key to the local storage


//add useEffect to check whether encrypted key exists and then decrypt the key and redirect to the admin page


const PasskeyModal = () => {

    const [open, setOpen] = useState(true)
    const [passKey, setPassKey] = useState('')
    const [error, setError] = useState('')

    const closeModal = () => {
        setOpen(false)
    }

    const router = useRouter()
    const path = usePathname()
    
    const encryptedKey = typeof window !== 'undefined' && window.localStorage.getItem('accessKey')
        
        useEffect(() => {
            const accessKey = encryptedKey && decryptKey(encryptedKey)
            if (path){
                if(accessKey === process.env.NEXT_PUBLIC_PASSKEY){
                    setOpen(false),
                    router.push('/admin')
                } else {
                    setOpen(true)
                }   
            }
        }, [encryptedKey])

    const validateKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {  
        e.preventDefault()
        if(passKey === process.env.NEXT_PUBLIC_PASSKEY){
            const encryptedKey = encryptKey(passKey)
            localStorage.setItem('accessKey',encryptedKey),
            setOpen(false),
            router.push('/admin')
        }
        else (
            setError('Invalid Passkey, Please try again'),
            setOpen(true)
        )
      }

    
    return (
        <div className='flex flex-1'>

      <AlertDialog open={open} onOpenChange={() =>setOpen(true)}>
        <AlertDialogContent className="shad-alert-dialog">
            <AlertDialogHeader>
                <AlertDialogTitle className='flex items-start justify-between pb-2 text-2xl'>Access Verification
                <Image 
                    src='/assets/icons/close.svg' 
                    alt="close-button"
                    height={24}
                    width={24}
                    onClick={() => closeModal()}
                    className="cursor-pointer"       
                    />
                </AlertDialogTitle>

            <AlertDialogDescription className='text-md text-[#ABB8C4] pb-8'>
                To access the admin dashboard, please enter the passkey...
            </AlertDialogDescription>

            <div>
                <InputOTP 
                    className="shad-otp"
                    maxLength={6}
                    value={passKey}
                    onChange={(value)=>setPassKey(value)}
                >
                <InputOTPGroup className='gap-3'>
                    <InputOTPSlot className="shad-otp-slot" index={0} />
                    <InputOTPSlot className="shad-otp-slot" index={1} />
                    <InputOTPSlot className="shad-otp-slot" index={2} />
                    <InputOTPSlot className="shad-otp-slot" index={3} />
                    <InputOTPSlot className="shad-otp-slot" index={4} />
                    <InputOTPSlot className="shad-otp-slot" index={5} />
                </InputOTPGroup>
                </InputOTP>
          
          
                {error && <p className='shad-error text-14-regular mt-4 flex justify-cente'>
                    {error}</p>}
            </div>

            </AlertDialogHeader>
            <AlertDialogFooter>


            <AlertDialogAction 
            className='shad-primary-btn w-full' 
            onClick={(e)=>validateKey(e)}
            >
                Enter Admin Panel </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </div>
  )
}

export default PasskeyModal
