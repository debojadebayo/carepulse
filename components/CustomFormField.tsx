"use client"

import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from './Forms/PatientForm'
import Image from 'next/image'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface CustomProps {

    control:Control<any>,
    fieldType:FormFieldType,
    name:string,
    label?:string,
    placeholder?:string,
    iconSrc?:string,
    iconAlt?:string,
    disabled?:boolean,
    dateFormat?:string,
    timeFormat?:string,
    children?:React.ReactNode,
    renderSkeleton?:(field:any)=>React.ReactNode,

}

const RenderField = ({field, props}:{field:any; props:CustomProps}) => {

    const { fieldType, iconSrc, iconAlt } = props
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex border rounded-md bg-dark-400 border-dark-500 '>
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || 'icon'}
                            height={24}
                            width={24}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input {...field} {...props} className='shad-input border-0'/>
                    </FormControl>

                </div>
            ) 
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry='GB'
                        international 
                        placeholder={props.placeholder}
                        onChange={field.onChange}
                        withCountryCallingCode
                        className='input-phone'
                        value={field.value as E164Number | undefined} 
                         />
                </FormControl>
            )

}
}


export const CustomFormField = (props:CustomProps) => {

    const {control, fieldType, name, label, placeholder, iconSrc, iconAlt, disabled, dateFormat, timeFormat, children, renderSkeleton } = props

    return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage className='shad-error'/>
        </FormItem>
        )}
      />
    )

}
