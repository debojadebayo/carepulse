import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import * as Sentry from '@sentry/nextjs'

const Register = async ({ params }:SearchParamProps) => {

  const { userid } = params

  
  // import Sentry here, use import * as Sentry- review the import details from metrics docs 
  // do the same with a user view on the new appointment page 
  //final track in the success page- you will need to import the getUser function in order to use the user_name
  
  const user = await getUser(userid)

  Sentry.metrics.set("user_view_register", user.name);
  
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
