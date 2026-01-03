"use client";

import { selectApp as selectAppSelector } from "@/store/slices/appSlice";
import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "@/store/slices/appSlice";
import { useMemo } from "react";
import { detectOS } from "@/lib/utils";
import { useWindowSize } from "react-use";
import { LoaderPinwheel } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    isAuthenticated: boolean;
    logout: () => void;
    login: () => void;
    isMacOS: boolean;
    isMobile: boolean;
    isTablet: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
    const { isAuthenticated } = useSelector(selectAppSelector);
    const dispatch = useDispatch();
    const isMacOS = useMemo(() => detectOS() === 'macos', []);
    const { width } = useWindowSize();
    const isMobile = useIsMobile();
    const isTablet = (width < 900) && !isMobile;
    const isWindowDefined = typeof window !== 'undefined';

    const logout = () => {
        dispatch(logoutAction(false));
    }

    const login = () => {
        dispatch(logoutAction(true));
    }

    if (!isWindowDefined) return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <LoaderPinwheel className="w-12 h-12 text-theme-green animate-spin" />
                <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
        </div>
    );
    
    return <AuthContext.Provider value={{ isAuthenticated, logout, login, isMacOS, isMobile, isTablet }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}