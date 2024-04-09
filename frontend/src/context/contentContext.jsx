import { createContext, useContext } from "react";


const ContentContext = createContext();

export const useContentContext = () => useContext(ContentContext)


export const ContentProvider = ({children}) => {







    return (
        <ContentContext.Provider value={{}}>
            {children}
        </ContentContext.Provider>
    )
}