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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectTrigger, SelectValue, SelectContent } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'

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
    showTimeSelect?:boolean,
    children?:React.ReactNode,
    renderSkeleton?:(field:any)=>React.ReactNode,

}

const RenderField = ({field, props}:{field:any; props:CustomProps}) => {

    const { fieldType, iconSrc, iconAlt, dateFormat, showTimeSelect, renderSkeleton, placeholder, children, disabled, label, name } = props

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
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea {...field} {...props} 
                    placeholder={placeholder}
                    className='shad-textArea'
                    disabled={disabled}/>
                </FormControl>
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
        case FormFieldType.DATE_PICKER:
            return (
                <div className='flex border rounded-md bg-dark-400 border-dark-500'>
                    <Image
                        src='/assets/icons/calendar.svg'
                        alt='calendar'
                        height={24}
                        width={24}
                        className='ml-2'
                    />
                    <DatePicker 
                        selected={field.value}
                        onChange={(date:Date | null, event: React.SyntheticEvent<any> | undefined) => field.onChange(date)}
                        wrapperClassName='date-picker'
                        dateFormat={ dateFormat ?? "dd/MM/yyyy"}
                        timeInputLabel='Time:'
                        showTimeSelect={showTimeSelect ?? false}
                    />
                </div>
            )
        case FormFieldType.SKELETON:
            return (
                renderSkeleton ? renderSkeleton(field) : null
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className='shad-select-trigger'>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent className='shad-select-content'>
                                {children}
                            </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.CHECKBOX:
            return (
                <div className='flex gap-4 p-2'>
                    <FormControl>
                        <Checkbox
                        id={name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <FormLabel className='shad-input-label'>{label}</FormLabel>
                </div>
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
