import React from 'react'
import { IconButton } from "@material-tailwind/react";

const Header = () => {
  return (
    <header className='sticky top-0 z-50 flex items-center px-1 py-2 shadow-md bg-white'>
      <IconButton color='blue' variant='text' size='lg'>
        <i class="fa-solid fa-bars" />
      </IconButton>
      <IconButton color='blue' variant='text' size='lg'>
        {/* <i class="fa fa-file-text" /> */}
        <img src="/docs.png" alt="" srcset="" />
      </IconButton>
      <h1 className='ml-2 text-gray-700 text-xl'>Docs</h1>

      <div className='mx-5 md:mx-5 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md'>
        <IconButton color='gray' variant='text' size='3xl'>
          <i class="fa-solid fa-magnifying-glass"></i>
        </IconButton>
        <input type="text" placeholder='Search' className='flex-grow px-5 text-base bg-transparent outline-none' />

   
      </div>
      <IconButton color='gray' variant='text' size='md'>
        <img src="/apps.png" alt="" />
      </IconButton>   

      <img loading='lazy' src="" alt="" className='hidden cursor-pointer h-12 w-12 rounded-full ml-2' />
    </header>
  )
}

export default Header