import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './services/helper';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/getUserRole`, { withCredentials:true });
                setRole(res.data.role);
            } catch (error) {
                console.error('Error fetching user role:', error);
            } 
        };

        fetchUserRole();
    }, []);

    return (
        <UserContext.Provider value={{ role,setRole }}>
            {children}
        </UserContext.Provider>
    );
};
