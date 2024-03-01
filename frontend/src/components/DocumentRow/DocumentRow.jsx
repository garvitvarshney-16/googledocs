import React from 'react'
import { IconButton } from '@material-tailwind/react'
import { Link } from 'react-router-dom';

const DocumentRow = () => {
    const currentDate = new Date().toLocaleDateString()
    return (
        <div className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer'>
            <IconButton color='blue' variant='text' size='sm'>
                <img src="/docs.png" alt="" srcset="" />
            </IconButton>
            <Link to="/doc" className='flex-grow pl-5 w-10 pr-10 truncate font-bold'>
                Test
            </Link>
            <p className="pr-5 text-sm">{currentDate}</p>

            <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
    )
}

export default DocumentRow