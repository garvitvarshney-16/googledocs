import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";


const DocumentContext = createContext();

export const useDocumentContext = () => useContext(DocumentContext)

export const DocumentProvider = ({ children }) => {

    const [content, setContent] = useState('')
    const [document, setDocument] = useState('')
    const [docDetail, setDocDetail] = useState([])
    const { user } = useUserContext()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const docStored = localStorage.getItem("document");
        if (docStored) {
            try {
                const parsedUser = JSON.parse(docStored);
                setDocument(parsedUser);
            } catch (error) {
                console.error("Error parsing user data from local storage:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const allDocs = await getAllDocs();
                setDocDetail(allDocs);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching documents', error);
                setLoading(false);
            }
        };
        fetchDocs();
    }, [docDetail]);

    const createDoc = async (title, content, userId) => {
        try {
            const res = await axios.post('https://googledocs-u3am.onrender.com/api/v1/document/newdoc', {
                title,
                content,
                userId,
            });
            localStorage.setItem("document", JSON.stringify(res.data))
            if (res.data) {
                setDocDetail([docDetail, res.data]);
            }
            return res.data;
        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
    }

    const fetchDocumentContent = async (id) => {
        try {
            const response = await axios.get(`https://googledocs-u3am.onrender.com/api/v1/document/saved-content/${id}`);
            if (response.status === 200) {
                const data = response.data.content;
                setContent(data);
            } else {
                console.error('Failed to fetch document content');
            }
            return response.data.content;
        } catch (error) {
            console.error('Error fetching document content:', error);
        }
    };

    const updateContent = async (id, content) => {
        try {
            const res = await axios.post(`https://googledocs-u3am.onrender.com/api/v1/document/updatecontent/${id}`, {
                content,
            });
        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
    }

    const getAllDocs = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const id = user._id;
            const res = await axios.get(`https://googledocs-u3am.onrender.com/api/v1/document/alldocs/${id}`)
            if (!res) {
                throw new Error("Resonse is not fetched")
            }
            return res.data.documents
        } catch (error) {
            console.error('Error fetching documents:', error);
            throw error;
        }
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <DocumentContext.Provider value={{ document, createDoc, getAllDocs, content, setContent, updateContent, fetchDocumentContent }}>
            {children}
        </DocumentContext.Provider>
    )
}