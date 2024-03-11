import React from 'react'
import { IconButton } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import TextEditor from '../TextEditor/TextEditor';
import { Link } from 'react-router-dom';


const DocumentPage = () => {
  return (
    <div>
      <header className='flex justify-between items-center p-3 pb-1'>
        <IconButton color='blue' variant='text' size='lg'>
          {/* <i class="fa fa-file-text" /> */}
          <Link to="/">
            <img src="/docs.png" alt="" srcset="" />
          </Link>
        </IconButton>

        <div className='flex-grow px-2'>
          <h2>Text</h2>
          <div className='flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600'>
            <p className='cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg'>File</p>
            <p className='cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg'>Edit</p>
            <p className='cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg'>View</p>
            <p className='cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg'>Insert</p>
            <p className='cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg'>Format</p>
            <p className='cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg'>Tools</p>
          </div>
        </div>

        <Button color="blue" size='sm' className='hidden md:inline-flex'>Share</Button>

        <img className='cursor-pointer rounded-full h-10 w-10 ml-2' src="/googleicon.png" alt="" />
      </header>

      {/* TextEditor */}
      <TextEditor />
    </div>
  )
}

export default DocumentPage;

// export async function getServerSideProps(context) {
//   const session = getSession(context);

//   return {
//     props:{

//     }
//   }
// }