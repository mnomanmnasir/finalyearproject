import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';



const AuthContext = createContext();
let temp;
export const AuthProvider = ({ children }) => {
    // const [authenticated, setAuthenticated] = useState(false);
    // const [token, setToken] = useState('');

    // const login = (t) => {
    //     if (t != "") {
    //         setToken(token);
    //         // Implement your login logic here
    //         setAuthenticated(true);
    //         // sessionStorage.setItem('authToken', token);
    //         Cookies.set('authToken', token, { secure: true, sameSite: 'strict', expires: 1, })
    //         // Cookies.set('authToken', token, { secure: true, sameSite: 'strict', httpOnly: true });
    //         return true;
    //     }
    //     return false;
    // };

    // const logout = () => {
    //     // Implement your logout logic here
    //     // Cookies.remove('authToken');
    //     Cookies.remove('authToken');
    //     sessionStorage.removeItem('authToken');
    //     setToken('');
    //     setAuthenticated(false);
    // };
    const [token, setToken] = useState(Cookies.get('authToken') || '');
    const authenticated = !!token;
    // temp = token;
    const login = (t) => {
        if (t !== "") {
            setToken(t);
            Cookies.set('authToken', t, { secure: true, sameSite: 'strict', expires: 1 });
            return true;
        }
        return false;
    };

    const logout = () => {
        Cookies.remove('authToken');
        setToken('');
    };
    return (
        <AuthContext.Provider value={{ authenticated, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

