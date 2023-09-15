'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { signIn, signOut } from "next-auth/react";
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [hambuger, setHambuger] = useState(false);

  const handleHambuger = () => {
    setHambuger(!hambuger)
  }

  return (
    <div className='container flex justify-between items-center bg-h-[30px] mt-[20px]'>
      <div className='flex items-center'>
        <Image
          src='/assets/navbar/Resume_Logo.png'
          width={90}
          height={35}
          alt='Navbar logo'
          className="mb-[-5px] md:mb-0"
        />
        <h1 className='hidden md:block text-[#FF5C00] text-[28px] ml-[-20px] mb-2'>FutureResume</h1>
      </div>
      <div className='hidden md:flex gap-14'>
        <Link href="/signup">
          <Button variant="outline" className='border-[#FF5C00] rounded-3xl px-9 py-3'>Sign Up</Button>
        </Link>
        <Link href="/signin">
          <Button variant="outline" className='bg-[#FF5C00] rounded-3xl text-white px-10 py-3'>Sign In</Button>
        </Link>
      </div>

      {/* Mobile nav menu */}
      <div className={`flex flex-col absolute top-0 w-full h-screen bg-white text-xl py-16 px-10 ease-in-out duration-500 ${hambuger ? "left-0" : "-left-[100%]"}`}>
        {/* Hamburger close menu */}
        <X onClick={handleHambuger} className="text-[#FF5C00] h-12 w-12 cursor-pointer" />
        <ul className="flex flex-col gap-6 items-center absolute top-[20%] left-[50%] -translate-x-[50%] -translate-y-[20%]">
          <li className="ease-in-out duration-300 hover:text-[#FF5C00]">
            <Link href="/">Sign up</Link>
          </li>
          <li>
            <Link className="ease-in-out duration-300 hover:text-[#FF5C00]" href="/" >Sign in</Link>
          </li>
        </ul>
      </div>

      <div className="visible md:hidden">
        <Menu onClick={handleHambuger} className="text-[#FF5C00] h-12 w-12 cursor-pointer" />
      </div>
    </div>
  )
}

export default Navbar