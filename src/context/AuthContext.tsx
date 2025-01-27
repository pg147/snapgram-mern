// React imports
import React, { createContext, useContext, useEffect, useState } from "react"

// React-router-dom
import { useNavigate } from "react-router-dom";

// Appwrite
import { getCurrentUser } from "@/lib/appwrite/api";

// Types
import { IUser } from "@/types";

const initialUser = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageURL: '',
    bio: ''
}

const initialState = {
    user: initialUser,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean
}

// Context
const AuthContext = createContext(initialState);

// Provider
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(initialUser);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const checkAuthUser = async () => {
        try {
            setIsLoading(true);

            const currentAccount = await getCurrentUser();

            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageURL: currentAccount.imageURL,
                    bio: currentAccount.bio
                });

                setIsAuthenticated(true);
                return;
            }

            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

    useEffect(() => {
        if (localStorage.getItem('cookieFallback') === '[]') {
            navigate('/sign-in');
        }

        checkAuthUser();
    }, []);

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);