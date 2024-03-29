import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userStored = localStorage.getItem("user");
        if (userStored) {
            try {
                const parsedUser = JSON.parse(userStored);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data from local storage:", error);
                localStorage.removeItem("user"); // Clear invalid data from local storage
            }
        }
    }, []);

    const login = async (inputs) => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/user/new",
                inputs,
            );
            if (res.data) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setUser(res.data.user);
            } else {
                console.error("Response is null");
            }

            return res;
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, login }}>
            {children}
        </UserContext.Provider>
    );
};
