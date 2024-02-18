import React from 'react'
import { IconButton } from "@material-tailwind/react";

const Header = () => {
  return (
      <div className='sticky top-0 z-50 flex items-center px-1 py-2 shadow-md bg-white'>
        <IconButton color='blue' variant='text' size='lg'>
          <i class="fa-solid fa-bars" />
        </IconButton>
        <IconButton color='blue' variant='text' size='lg'>
          <i class="fa fa-file-text" />
        </IconButton>
        <h1 className='ml-2 text-gray-700 text-xl'>Docs</h1>

        <div>
          
        </div>
      </div>
  )
}

export default Header