import React, {createContext, useState, useEffect} from 'react';
import {getToken} from "../../utils/auth";
import {getInfoMe} from "../api/auth";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({});

    const fetchUserInfo = async () => {
        const token = getToken();
        const res = await getInfoMe({token});
        if (res.code === 200) {
            setUser(res.data.user);
        }
    };

    useEffect(() => {
        fetchUserInfo().then();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, fetchUserInfo}}>
            {children}
        </UserContext.Provider>
    );
};