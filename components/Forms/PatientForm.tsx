"use client"

import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { CustomFormField } from "@/components/CustomFormField"
import SubmitButton from '../ui/SubmitButton'
import { UserValidationSchema } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/patient.actions'


export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT= "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  
}

const PatientForm = () => {
  
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const form = useForm<z.infer<typeof UserValidationSchema>>({
    resolver: zodResolver(UserValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  useEffect(() => {
    console.log("isLoading state changed:", isLoading);
  }, [isLoading]);


  async function onSubmit(values: z.infer<typeof UserValidationSchema>) {
    
    setIsLoading(true)
    console.log(isLoading)

    try {
      const userData = { 
        name: values.name, 
        email: values.email, 
        phone: values.phone
      }

      const newUser = await createUser(userData)
      if(newUser) router.push(`/patients/${newUser.id}/register`)
    } catch (error) {
      console.error(error)
    } 
    
    setIsLoading(false)
    console.log(isLoading)
  }

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <section className="mb-12">
        <div>
          <h1 className="text-5xl font-bold">Hi there...</h1>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium text-dark-700">Get started with appointments</h3>
        </div>
      </section>

      <CustomFormField 
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Full Name"
        placeholder="James Buchanan"
        iconSrc = "/assets/icons/user.svg"
        iconAlt = "User Icon"
      />
      <CustomFormField 
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="Email"
        label="email"
        placeholder="debo@carepulse.com"
        iconSrc = "/assets/icons/email.svg"
        iconAlt = "User Email"
      />

      <CustomFormField 
        control={form.control}
        fieldType={FormFieldType.PHONE_INPUT}
        name="Phone Number"
        label="Phone Number"
        placeholder="07507646100"
      />
      
      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForm
