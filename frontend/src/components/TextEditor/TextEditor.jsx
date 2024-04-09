import { useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Box } from '@mui/material';
import styled from '@emotion/styled';


const Component = styled.div`
    background: #F5F5F5;
`


const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];


const TextEditor = () => {
    useEffect(() => {
<<<<<<< HEAD
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
        setValue(content);
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
=======
        const quillServer = new Quill('#container', { theme: 'snow', modules: { toolbar: toolbarOptions }})
    }, [])
>>>>>>> c2de68e130b6cfb4d614e8fdef0b59f1bbdc9f60

    return (
        <Box>
            <Box className = 'container' id='container'></Box>
        </Box>
    )
}


export default TextEditor;