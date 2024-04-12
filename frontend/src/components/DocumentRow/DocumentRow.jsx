import React, { useEffect, useState } from 'react'
import {
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Typography,
} from '@material-tailwind/react'
import { Link } from 'react-router-dom';
import { useDocumentContext } from '../../context/documentContext';

const DocumentRow = () => {

    const { getUserDocs } = useDocumentContext()
    const [document, setDocument] = useState([]);
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const allDocs = await getUserDocs()
                setDocument(allDocs)
            } catch (error) {
                console.log('Error fetching documents', error);
            }
        }
        fetchDocs();
    }, [getUserDocs])


    const updateTitle = async () => {
        try {
            if (!selectedDocumentId) {
                console.error('Document ID is missing');
                return;
            }
            // Send the updated title and document ID to the server
            const response = await fetch(`http://localhost:8000/api/v1/document/updatetitle/${selectedDocumentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTitle }),
            });
            if (response.ok) {
                handleOpen();
            } else {
                // Handle error response
                console.error('Failed to update document title');
            }
        } catch (error) {
            console.error('Error updating document title', error);
        }
    }

    const deleteDoc = async (DocId) => {
        try {
            if (!DocId) {
                console.error('Document ID is missing');
                return;
            }

            const res = await fetch(`http://localhost:8000/api/v1/document/${DocId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) {
                throw new Error('Failed to delete document');
            }

            // Document deleted successfully
            console.log('Document deleted successfully');
        } catch (error) {
            console.error('Error deleting document:', error.message);
        }
    }

    const handleOpenWithId = (docId) => {
        setSelectedDocumentId(docId);
        handleOpen();
    }

    const MessageDialog = (
        <Dialog open={open} size="xs" handler={handleOpen}>
            <DialogBody>
                <div className="grid gap-6">
                    <Typography className="-mb-1" color="blue-gray" variant="h6">
                        Rename
                    </Typography>
                    <Input
                        label="Please enter a new name for the item:"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)} />
                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" onClick={handleOpen}>
                    cancel
                </Button>
                <Button variant="gradient" color="blue" onClick={updateTitle}>
                    ok
                </Button>
            </DialogFooter>
        </Dialog>
    )


    return (
        <>
            {MessageDialog}
            {document.map((doc) => (
                <div key={doc._id} className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer'>
                    <IconButton color='blue' variant='text' size='sm'>
                        <img src="/docs.png" alt="" srcSet='' />
                    </IconButton>
                    <Link to={`/doc/${doc._id}`} className='flex-grow pl-5 w-10 pr-10 truncate font-bold'>
                        {doc.title}
                    </Link>
                    <p className="pr-5 text-sm">{new Date(doc.createdAt).toLocaleDateString()}</p>



                    <Menu>
                        <MenuHandler>
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem onClick={() => handleOpenWithId(doc._id)}><i class="fa-regular fa-pen-to-square"></i> Rename</MenuItem>
                            <MenuItem onClick={() => deleteDoc(doc._id)}><i class="fa-solid fa-trash"></i> Remove</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            ))}
        </>
    )
}




export default DocumentRow