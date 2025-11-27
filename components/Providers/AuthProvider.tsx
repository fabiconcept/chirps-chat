"use client";

import { selectApp as selectAppSelector } from "@/store/slices/appSlice";
import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "@/store/slices/appSlice";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    isAuthenticated: boolean;
    logout: () => void;
    login: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
    const { isAuthenticated } = useSelector(selectAppSelector);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutAction(false));
    }

    const login = () => {
        dispatch(logoutAction(true));
    }
    
    return <AuthContext.Provider value={{ isAuthenticated, logout, login }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}