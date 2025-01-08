import React from "react";
import { Stack } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

// Hooks
import { usePaginateData } from "../../../hooks/useFetchData";

// Contexts
import { useAuthContext } from "../../../contexts/authContext";

export default function WorkerProducts() {
    const { userSession } = useAuthContext();

    const {
        data: products,
        loading: loadingProducts,
        reload: reloadProducts,
    } = usePaginateData(`/users/${userSession.user_id}/products`);

    if (loadingProducts) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <>
            <Stack.Screen options={{ headerTitle: "Tus Productos" }} />
            <View></View>
        </>
    );
}
