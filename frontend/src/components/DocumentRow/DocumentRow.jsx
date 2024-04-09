import React from 'react'
import { IconButton } from '@material-tailwind/react'
import { Link } from 'react-router-dom';

const DocumentRow = () => {
<<<<<<< HEAD
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
=======
    const currentDate = new Date().toLocaleDateString()
>>>>>>> c2de68e130b6cfb4d614e8fdef0b59f1bbdc9f60
    return (
        <div className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer'>
            <IconButton color='blue' variant='text' size='sm'>
                <img src="/docs.png" alt="" srcSet='' />
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