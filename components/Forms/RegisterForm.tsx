"use client"

import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl } from "@/components/ui/form"
import { CustomFormField, FormFieldType } from "../CustomFormField"
import SubmitButton from '../SubmitButton'
import { PatientFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser, registerPatient } from '@/lib/actions/patient.actions'
import 'react-phone-number-input/style.css'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Doctors, genderOptions, IdentificationTypes, PatientFormDefaultValues } from '@/constants'
import { SelectItem } from '../ui/select'
import Image from 'next/image'
import { FileUp } from 'lucide-react'
import FileUpload from '../FileUpload'

const RegisterForm = ( {user}: {user:User}) => {
  
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })


  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true); 


    // stores the uploaded file and image in a Blob format 
    let formData

    if(values.identificationDocument && values.identificationDocument.length > 0){
   
      const blobFile = new Blob([values.identificationDocument[0]], {
        type:values.identificationDocument[0].type
      })

    formData= new FormData()
    formData.append('blobFile', blobFile)
    formData.append('fileName', values.identificationDocument[0].name)
  }

  //pushes user form details to database

    try {
      const patientData = {
        userId: user.$id,
        ...values,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData
      }

      const patient = await registerPatient(patientData)
      
      router.push(`/patients/${user.$id}/new-appointment`)
      
      setIsLoading(false)

    } catch (error: any) {
    console.error(error)
    
    }

  }

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-8">
      <section className="mb-12 space-y-4">
        <div>
          <h1 className="text-5xl font-bold">Welcome 👋</h1>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium text-dark-700">Tell us a little bit about yourself</h3>
        </div>
      </section>

      <section>
      <div className="mt-8">
          <h2 className="text-4xl font-bold">Personal Information</h2>
        </div>
      </section>

      <div>
        <CustomFormField 
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="James Buchanan"
          iconSrc = "/assets/icons/user.svg"
          iconAlt = "User Icon"
        />
      </div>


      <div className='flex flex-col gap-6 xl:flex-row'>
        <CustomFormField 
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
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
      </div>

      <div className='flex flex-col gap-6 xl:flex-row'>
      <CustomFormField 
          control={form.control}
          fieldType={FormFieldType.DATE_PICKER}
          name="birtdate"
          label="Date of Birth"
        />

        <CustomFormField 
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="gender"
          label="Gender"
          renderSkeleton={(field) => {

            return(
              <FormControl>
                <RadioGroup 
                  className="flex h-11 gap-6 xl:kjustify-between"
                  onValueChange={field.change}
                  defaultValue={field.value}>
                    {genderOptions.map((option,i ) => (

                      <div key= {option + i} className='radio-group'>
                        <RadioGroupItem value={option} id={option}/>
                        <Label htmlFor={option} className='cursor-pointer'>
                          {option}
                        </Label>
                      </div>
                    ))}

                </RadioGroup>
              </FormControl>
            )
          }}
        
          />

      </div>
      
      <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
          control=  {form.control}
          fieldType={FormFieldType.INPUT}
          name='address' 
          label='Address'
          placeholder='Enter your address'
          />

          <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="occupation"
          label="Occupation"
          placeholder='Software Developer'
          
          />
      </div>


      <div className='flex flex-col gap-6 xl:flex-row'>
        <CustomFormField
            control=  {form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName" 
            label="Emergency Contact Name"
            placeholder="Guardian's Name"
            />

          <CustomFormField 
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="emergencyContactNumber"
          label="Emergency Contact Phone Number"
          placeholder='ex. 07547646100'
          
          />
      </div>

      <section className="space-y-6">
        <div className="mb-9 space-y-1">
          <h2 className="subheader text-4xl font-bold">
            Medical Information
          </h2>

        </div>
      </section>

          <CustomFormField 
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a physician"
          >
            <>
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className='flex cursor-pointer items-center gap-2 border border-dark-600 p-2 rounded-md bg-[#D7EDED] bg-opacity-15'>
                    <Image 
                    src={doctor.image} 
                    alt="doctor"
                    width={24} 
                    height={24} 
                    className='rounded-full border border-dark-500'
                    />
                  
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>))}
            </>
          </CustomFormField>
      
          <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control=  {form.control}
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider" 
            label="Insurance Provider"
            placeholder="ex. BUPA"
          />

          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="ex. ABC654234"    
          />
        </div>


        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField 
            control = {form.control}
            fieldType= {FormFieldType.TEXTAREA}
            name="familyHistory"
            label="Family Medical History (if relevant)"
            placeholder="ex. Mother had breast cancer"
          />
                  
          <CustomFormField 
            control = {form.control}
            fieldType= {FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="ast Medical History (if relevant)"
            placeholder="ex Type 2 Diabetes, Hypertension"
              // this could be a select button which imports a database/list of conditions as per ICD-10, SNOMED 
          />
        </div>

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField 
           control = {form.control}
           fieldType= {FormFieldType.TEXTAREA}
           name="allergies"
           label="Allergies (if any)"
           placeholder="Penicillin, Pollen, Aspirin etc"
          />
          
          <CustomFormField 
           control = {form.control}
           fieldType= {FormFieldType.TEXTAREA}
           name="currentMedication"
           label="Current Medications"
           placeholder="Please make a list of the regular medications you take"
           // this could be a select button which imports a database/list of medications from the BNF
          />
        </div>

        <section className="space-y-6">
        <div className="mb-9 space-y-1">
          <h2 className="subheader text-4xl font-bold">
            Identification and Verification
          </h2>
        </div>
      </section>
      <div>
        <CustomFormField 
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="identificationType"
          label="Identification Type"
          placeholder="Select an ID type"
        >
              <>
                {IdentificationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>))}
              </>
            </CustomFormField>

      </div>

      <div>
      <CustomFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="identificationNumber"
        label="Identification Number"
        placeholder="ex. 123456789"    
      />
      </div>

      <div>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="identificationDocument"
          label="Upload Identification Document"
          renderSkeleton={(field) => (
              <FileUpload
                files={field.value} 
                onChange={field.onChange}
              />
          )}
        />
       </div>

       <section className="space-y-6">
        <div className="mb-9 space-y-1">
          <h2 className="subheader text-4xl font-bold">
          Consent and Privacy
          </h2>
        </div>
        
        <div>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="privacyConsent"
          label="I acknowledge that I have reviewed and agree to the privacy policy"
          />
         <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="treatmentConsent"
          label="I consent to receive treatment for my health condition"
          />
         <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="disclosureConsent"
          label="I consent to the use and disclosure of my health information for treatment purposes"
          />
       </div>
          
      </section>


   
      
      <SubmitButton isLoading={isLoading}>Sumit and Continue</SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm
