import React, { useEffect, useState } from 'react'
import {
  Button, Avatar, IconButton, Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography
} from "@material-tailwind/react";
import TextEditor from '../TextEditor/TextEditor';
import { Link, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { useDocumentContext } from '../../context/documentContext';
import axios from 'axios';

const DocumentPage = () => {
  const [document, setDocument] = useState();
  const { user } = useUserContext();
  const { getAllDocs } = useDocumentContext();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('')
  const [link, setLink] = useState('');

  const handleOpen = () => setOpen(!open);

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

  const handleShare = async () => {
    try {
      const response = await axios.post('https://googledocs-u3am.onrender.com/api/v1/user/share', {
        email,
        link,
        message,
      });
      setOpen(false);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const Model = (
    <Dialog open={open} size="xs" handler={handleOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader className="flex flex-col items-start">
          {" "}
          <Typography className="mb-1" variant="h4">
            Share {`${document?.title}`}
          </Typography>
        </DialogHeader>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-3 h-5 w-5"
          onClick={handleOpen}
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <DialogBody>
        <div className="grid gap-6">
          <Typography className="-mb-1" color="blue-gray" variant="h6">
            Email
          </Typography>
          <Input label="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Typography className="-mb-1" color="blue-gray" variant="h6">
            Link
          </Typography>
          <Input label="link" value={link} onChange={(e) => setLink(e.target.value)} />
          <Textarea label="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" color="gray" onClick={handleOpen}>
          cancel
        </Button>
        <Button variant="gradient" color="gray" onClick={handleShare}>
          send
        </Button>
      </DialogFooter>
    </Dialog>
  );

  return (
    <div>
      {Model}
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
          <Button color="blue" size='sm' onClick={handleOpen}>Share</Button>

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
  );
}

export default DocumentPage;
