import React, { useState } from 'react'
import { IconButton } from '@material-tailwind/react'
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import DocumentRow from '../DocumentRow/DocumentRow';
import { useDocumentContext } from '../../context/documentContext';
import { useUserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';



const Document = () => {

    const [open, setOpen] = React.useState(false);
    const [input, setInput] = useState("")
    const handleOpen = () => setOpen((cur) => !cur);
    const { createDoc } = useDocumentContext()
    const { user } = useUserContext()
    const navigate = useNavigate()

    const createDocument = async () => {
        try {
            // Get the authenticated user's ObjectId
            const userId = user._id;

            // Create the document with the user ObjectId
            const documentId = await createDoc(input, '', userId); // Replace 'userIdHere' with actual userId

            // Notify user and reset input
            toast('Document created successfully!');
            setInput('');
            setOpen(false);

            // Return the document id
            return documentId;
        } catch (error) {
            console.error('Error creating document:', error);
            toast.error('Failed to create document');
            throw error; // Rethrow the error to handle it in the caller function if necessary
        }
    };


    const handleNavigateToDocumentPage = async () => {
        try {
            const documentId = await createDocument();
            const id = documentId._id;
            navigate(`/doc/${id}`); // Navigate to the document page
        } catch (error) {
            console.error('Error navigating to document page:', error);
        }
    };

    const Modal = (
        <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
        >
            <Card className="mx-auto w-full max-w-[24rem]">
                <CardBody className="flex flex-col gap-4">
                    <Input label="Enter name of document" value={input} onChange={(e) => setInput(e.target.value)} type='text' size="lg" onKeyDown={(e) => e.key === "Enter" && createDocument()} />
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" onClick={handleNavigateToDocumentPage} fullWidth color='blue'>
                        Create
                    </Button>
                </CardFooter>
                <CardFooter className="pt-0">
                    <Button variant="gradient" onClick={handleOpen} fullWidth color='blue'>
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
    )
    return (
        <div>
            {Modal}
            <section className='bg-[#F8F9FA] pb-9 px-10'>
                <div className='max-w-3xl mx-auto'>
                    <div className='flex items-center justify-between py-6' >
                        <h2 className='text-gray-700 text-lg' style={{ fontFamily: 'sans-serif', color: 'black' }}>Start a new document</h2>

                        <IconButton color='gray' variant='text' size='md'>
                            <img src="/more_vert.png" alt="" />
                        </IconButton>


                    </div>

                    <div className='flex flex-row gap-5'>
                        <div className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700' onClick={handleOpen}>
                            <img src="https://links.papareact.com/pju" alt="fill" />
                            <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>Blank</p>
                        </div>
                        <div className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700' onClick={handleOpen}>
                            <img src="./CV-Template-01.jpg" style={{ height: '100%', width: '100%' }} />
                            <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>Resume</p>
                        </div>
                        <div className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700' onClick={handleOpen}>
                            <img src="./CV-Template-01.jpg" style={{ height: '100%', width: '100%' }} />
                            <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>Resume</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-white px-10 md:px-0'>
                <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
                    <div className='flex items-center justify-between pb-5'>
                        <h2 className='font-medium flex-grow'>My Documents</h2>
                        <p className='mr-12'>Date Created</p>
                        <IconButton color='gray' variant='text' size='lg'>
                            <i class="fa-solid fa-folder"></i>
                        </IconButton>
                    </div>
                    <DocumentRow />
                </div>
            </section>
        </div>
    )
}

export default Document