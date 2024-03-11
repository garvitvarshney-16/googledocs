import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../App.css'
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"


const TextEditor = () => {

    const [value, setValue] = useState('');
    const [socket, setSocket] = useState(null);

    const { id } = useParams();

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

    const module = {
        toolbar: toolbarOptions,
    }

    useEffect(() => {
        const socket = io('http://localhost:9000');
        setSocket(socket);

        socket.emit('get-document', id);

        socket.on('load-document', (data) => {
            setValue(data);
        })

        return () => {
            socket.disconnect()
        }
    }, [id])

    // useEffect(() => {
    //     if (socket === null || value === null) {
    //         return;
    //     }

    //     const handleChange = (delta, oldData, source) => {
    //         if (source !== 'user') {
    //             return;
    //         }

    //         socket && socket.emit('send-changes', delta)
    //     }

    //     value && value.on('text-change', handleChange)

    //     return () => {
    //         value && value.off('text-change', handleChange)
    //     }
    // }, [value, socket])


    const handleChange = (content, delta, source, editor) => {
        if (source === 'user' && socket) {
            socket.emit('send-changes', { id, content });
        }
        // setValue(content);
    };

    useEffect(() => {
        if (!socket) {
            return
        }
        const handleReceiveChanges = ({ id: docId, content }) => {
            if (docId === id) {
                setValue(content);
            }
        }

        socket.on('receive-changes', handleReceiveChanges);

        return () => {
            socket.off('receive-changes', handleReceiveChanges);
        }

    }, [socket, id])

    return (
        <ReactQuill modules={module} theme='snow' value={value} onChange={handleChange} readOnly={!id} />
    )
}


export default TextEditor;