import Image from "next/image";
import { Button } from "@/components/ui/button";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import PasskeyModal from "@/components/PasskeyModal";

export default function Home({searchParams}:SearchParamProps) {

  const isAdmin = searchParams?.admin === 'true'

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto remove-scrollbar">
        <div className="subcontainer max-w-[490px]">
        
          {isAdmin && <PasskeyModal/>}
          
          <Image 
          src="/assets/icons/logo-full.svg" 
          alt="CarePulse Logo" 
          width={1000} 
          height={1000}
          className= "mb-12 h-12 w-fit"
          />

          <PatientForm/>

          <div className="text-14-regular mt-20 flex justify-between">
            <span className="justify-items-end text-dark-600 xl:text-left">© CarePulse 2024 - all rights reserved</span>
            <Link href="/?admin=true" className="text-green-500"> Admin</Link>
          </div>
        </div>

      </section>

      <Image
      src="/assets/images/onboarding-img.png"
      alt="Hero Image"
      width={1000}
      height={1000}
      className="side-img max-w-[50%]"
      />
    </div>

  )
}