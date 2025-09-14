import React from 'react'
import Image from 'next/image'
import { Bell } from 'lucide-react'
function Header() {
  console.log('hello world')
  return (
    <header className='bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] text-white mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg' >

      <div className='max-w-7xl mx-auto py-4 sm:px-6 flex items-center justify-between' >

          <Image src="/arrham-logo.png" width={240} height={240}  alt='logo' />

          <div className='flex items-center space-x-3 sm:space-x-6' >
            <Image
              src="/saudi.png"
              alt="country flag"
              width={40}
              height={30}
              className='rounded-full shadow-md cursor-pointer'
            />

          </div>
        
      </div>

    </header>
  )
}

export default Header
