import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import TextEditor from '../TextEditor/TextEditor';
import { Link, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { useDocumentContext } from '../../context/documentContext';

const DocumentPage = () => {
  const [document, setDocument] = useState();
  const { user } = useUserContext();
  const { getAllDocs } = useDocumentContext();
  const { id } = useParams(); // Extracting ID from useParams()

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const allDocs = await getAllDocs();
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

        <div className='flex flex-row justify-evenly gap-2'>
          <Button color="blue" size='sm'>Share</Button>

          <Avatar
            size='sm'
            variant="circular"
            alt={user ? "User Photo" : "Google Logo"}
            className="cursor-pointer"
            src={user?.photo || "https://docs.material-tailwind.com/icons/google.svg"}
          />
        </div>
      </header>

      {/* TextEditor */}
      <TextEditor />
    </div>
  )
}

export default DocumentPage;
