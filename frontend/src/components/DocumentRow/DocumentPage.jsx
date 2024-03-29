import React, { useEffect, useState } from 'react'
import { IconButton } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import TextEditor from '../TextEditor/TextEditor';
import { Link, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { useDocumentContext } from '../../context/documentContext';

const DocumentPage = () => {
  const [document, setDocument] = useState();
  const { user } = useUserContext();
  const { getUserDocs } = useDocumentContext();
  const { id } = useParams(); // Extracting ID from useParams()

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const allDocs = await getUserDocs();
        const filteredDoc = allDocs.find(doc => doc._id === id);
        setDocument(filteredDoc);
      } catch (error) {
        console.log('Error fetching documents', error);
      }
    };
    fetchDocs();
  }, []);

  return (
    <div>
      <header className='flex justify-between items-center p-3 pb-1'>
        <IconButton color='blue' variant='text' size='lg'>
          <Link to="/">
            <img src="/docs.png" alt="" srcset="" />
          </Link>
        </IconButton>

        <div className='flex-grow px-2'>
          <h2>{document?.title}</h2> {/* Accessing title from the document if it exists */}
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

        <Button color='gray' variant='text' size='md'>
          <img
            src={user?.photo || "https://docs.material-tailwind.com/icons/google.svg"}
            alt={user ? "User Photo" : "Google Logo"}
            style={{ height: '20px', width: '20px', borderRadius: '10px' }}
          />
        </Button>
      </header>

      {/* TextEditor */}
      <TextEditor />
    </div>
  )
}

export default DocumentPage;
