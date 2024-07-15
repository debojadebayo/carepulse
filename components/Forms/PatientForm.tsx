"use client"

import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { CustomFormField, FormFieldType } from "../CustomFormField"
import SubmitButton from '../SubmitButton'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/patient.actions'
import 'react-phone-number-input/style.css'

const PatientForm = () => {
  
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })


  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)
    console.log(isLoading)
  
    try {
      const userData = { 
        name: values.name, 
        email: values.email, 
        phone: values.phone
      }

      const newUser = await createUser(userData)
      if(newUser) router.push(`/patients${newUser.$id}/register`)
    } catch (error) {
      console.error(error)
    } 
    
    setIsLoading(false)

  }

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-8">
      <section className="mb-12 space-y-4">
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
        name="email"
        label="email"
        placeholder="debo@carepulse.com"
        iconSrc = "/assets/icons/email.svg"
        iconAlt = "User Email"
      />

      <CustomFormField 
        control={form.control}
        fieldType={FormFieldType.PHONE_INPUT}
        name="phone"
        label="Phone Number"
        placeholder="07507646100"
      />
      
      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForm
