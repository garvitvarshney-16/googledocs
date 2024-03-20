import React, { useEffect, useState } from 'react'
import { IconButton } from '@material-tailwind/react'
import { Link } from 'react-router-dom';
import { useDocumentContext } from '../../context/documentContext';

const DocumentRow = () => {
    const { getUserDocs } = useDocumentContext()
    const [document, setDocument] = useState([]);

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
    return (
        <>
            {document.map((doc) => (
                <div key={doc._id} className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer'>
                    <IconButton color='blue' variant='text' size='sm'>
                        <img src="/docs.png" alt="" srcSet='' />
                    </IconButton>
                    <Link to={`/doc/${doc._id}`} className='flex-grow pl-5 w-10 pr-10 truncate font-bold'>
                        {doc.title}
                    </Link>
                    <p className="pr-5 text-sm">{new Date(doc.createdAt).toLocaleDateString()}</p>

                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
            ))}
        </>
    )
}

export default DocumentRow