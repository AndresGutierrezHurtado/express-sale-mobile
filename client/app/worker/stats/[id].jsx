import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

// Hooks
import { useGetData } from "../../../hooks/useFetchData.js";

export default function WorkerStats() {
    const { id } = useLocalSearchParams();

    const { data: worker, loading: loadingWorker } = useGetData(`/users/${id}`);

    if (loadingWorker) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <>
            <Stack.Screen
                name="index"
                options={{ headerTitle: `Estadísticas ${worker.role.role_name}` }}
            />
            <View className="w-full px-3 py-10">
                <Text>Estadísticas {worker.role.role_name}</Text>
            </View>
        </>
    );
}
