import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (inputs) => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/user/new",
                inputs,
            )

            if (res.data) {
                setUser(res.data)
            } else {
                console.error("Response is null")
            }

            return res;
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    return (
        <UserContext.Provider value={{user, login}}>
            {children}
        </UserContext.Provider>
    )
}