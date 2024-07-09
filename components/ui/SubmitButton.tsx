import React from 'react'
import { Button } from './button'
import Image from 'next/image'

interface SubmitButtonProps {
    isLoading:boolean
    className?:string
    children:React.ReactNode
    }

const SubmitButton = ({isLoading, children, className}:SubmitButtonProps) => {
  return (
    <Button 
    type='submit'
    disabled={isLoading}
    className={className ?? 'shad-primary-btn w-full'}
    >
        {isLoading ? (
            <div className='flex items-center gap-4'>
                <Image
                src='/assets/icons/spinner.svg'
                alt='spinner'
                height={24}
                width={24}
                className='animate-spin'
                />
                Loading ...
            </div>

        ): children}
    </Button>
  )
}

export default SubmitButton
