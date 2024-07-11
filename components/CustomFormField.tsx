"use client"

import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { E164Number } from 'libphonenumber-js'
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import Image from 'next/image'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'


export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    CHECKBOX = "checkbox",
    PHONE_INPUT= "phoneInput",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
    
  }
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
    showTimeSelect?:string,
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

    const {control, fieldType, name, label, placeholder, iconSrc, iconAlt, disabled, dateFormat, showTimeSelect, children, renderSkeleton } = props

    return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
                <FormLabel className='shad-input-label'>{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage className='shad-error'/>
        </FormItem>
        )}
      />
    )

}
