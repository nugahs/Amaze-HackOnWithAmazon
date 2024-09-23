// hooks/useSelectedUser.js
import { useState, useEffect } from 'react';

export const useSelectedUser = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('selectedUser');
        if (storedUser) {
            setSelectedUser(storedUser);
        }
    }, []);

    const updateSelectedUser = (user) => {
        setSelectedUser(user);
        localStorage.setItem('selectedUser', user);
    };

    return [selectedUser, updateSelectedUser];
};