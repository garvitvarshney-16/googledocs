import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import { useDocumentContext } from '../../context/documentContext';

const TextEditor = () => {
    const [socket, setSocket] = useState(null);
    const { id } = useParams();
    const { content, setContent, updateContent, fetchDocumentContent } = useDocumentContext();
    const [cursorPosition, setCursorPosition] = useState(0); // Track cursor position

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedContent = await fetchDocumentContent(id);
                setContent(fetchedContent);
            } catch (error) {
                console.error('Error fetching document content:', error);
            }
        };

        fetchData();

        // Clean-up function
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [id, setContent, fetchDocumentContent, socket]);

    useEffect(() => {
        const newSocket = io('https://googledocs-1.onrender.com/');
        setSocket(newSocket);

        newSocket.emit('get-document', id);

        newSocket.on('load-document', (data) => {
            setContent(data.content);
            setCursorPosition(data.cursor || 0); // Set initial cursor position
        });

        newSocket.on('receive-changes', ({ content: updatedContent, cursor }) => {
            setContent(updatedContent);
            setCursorPosition(cursor || 0); // Update cursor position
        });

        // Clean-up function
        return () => {
            if (newSocket) {
                newSocket.close();
            }
        };
    }, [id, setContent]);

    const handleChange = (value, delta, source, editor) => {
        setContent(value);
        if (socket && source === 'user') {
            const cursor = editor.getSelection().index; // Get cursor position
            setCursorPosition(cursor); // Update local cursor position
            socket.emit('send-changes', { id, content: value, cursor });
            updateContent(id, value);
        }
    };

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];

    const modules = {
        toolbar: toolbarOptions,
    };

    return (
        <ReactQuill modules={modules} theme='snow' value={content} onChange={handleChange} readOnly={!id} />
    );
};

export default TextEditor;
