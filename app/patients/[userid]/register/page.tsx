import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'

const Register = async ({ params }:SearchParamProps) => {

  const { userid } = params

  // console.log("Received userId in Register component:", userid);
  // console.log("Page component params", params)

  const user = await getUser(userid)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container remove-scrollbar">
        <div className="subcontainer max-w-[850px]">
          
          <Image 
          src="/assets/icons/logo-full.svg" 
          alt="CarePulse Logo" 
          width={1000} 
          height={1000}
          className= "mb-12 h-12 w-fit"
          />

          <RegisterForm user={user}/>

          <span className="flex text-dark-600 justify-items-end xl:text-left text-sm mt-6">© CarePulse 2024 - all rights reserved</span>
  
        </div>

      </section>

      <Image
      src="/assets/images/register-img.png"
      alt="Hero Image"
      width={1000}
      height={1000}
      className="side-img max-w-[50%]"
      />
    </div>
  )
}

export default Register
