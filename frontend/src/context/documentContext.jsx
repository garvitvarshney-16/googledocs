import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const DocumentContext = createContext();

export const useDocumentContext = () => useContext(DocumentContext)

export const DocumentProvider = ({children}) => {
    const [document, setDocument] = useState(null)

    useEffect(() => {
        const docStorage = localStorage.getItem("document");
        if (docStorage) {
            setDocument(JSON.parse(docStorage))
        }
    },[])

    const createDoc = async (title, content , userId) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/document/newdoc', {
              title,
              content,
              userId
            });
            if (res.data) {
                localStorage.setItem("document", JSON.stringify({title, content, userId}))
                setDocument(res.data);
            }
            return res.data;
          } catch (error) {
            console.error('Error creating document:', error);
            throw error;
          }
    }

    return (
        <DocumentContext.Provider value={{document,createDoc}}>
            {children}
        </DocumentContext.Provider>
    )
}