import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";


const DocumentContext = createContext();

export const useDocumentContext = () => useContext(DocumentContext)

export const DocumentProvider = ({ children }) => {

    const [document, setDocument] = useState()
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
            const res = await axios.post('http://localhost:8000/api/v1/document/newdoc', {
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

    const getAllDocs = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/document/alldocs')
            if (!res) {
                throw new Error("Resonse is not fetched")
            }
            return res.data.documents
        } catch (error) {
            console.error('Error fetching documents:', error);
            throw error;
        }
    }

    const getUserDocs = () => {
        if (!user || !user._id) {
            // If user is not authenticated or user object is null, return an empty array
            return [];
        }
        const ans = docDetail.filter((doc) => doc.user === user._id);
        return ans
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <DocumentContext.Provider value={{ document, createDoc, getAllDocs, getUserDocs }}>
            {children}
        </DocumentContext.Provider>
    )
}