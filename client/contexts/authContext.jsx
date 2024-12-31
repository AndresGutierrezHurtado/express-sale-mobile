import React, { createContext, useContext, useEffect, useState } from "react";
import { router } from "expo-router";

// Hooks
import { useGetData, usePostData } from "../hooks/useFetchData";
import { ActivityIndicator } from "react-native";

const authContext = createContext();

export const useAuthContext = () => useContext(authContext);

export default function AuthContextProvider({ children }) {
    const {
        data: userSession,
        loading: loadinUserSession,
        reload: reloadUserSession,
    } = useGetData("/auth/session");

    const handleLogout = async () => {
        const response = await usePostData("/auth/logout");
        reloadUserSession();
    };

    if (loadinUserSession) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <authContext.Provider value={{ userSession, reloadUserSession, handleLogout }}>
            {children}
        </authContext.Provider>
    );
}
