import React from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { LineChart } from "react-native-chart-kit";

// Hooks
import { useGetData } from "../../../hooks/useFetchData.js";
import { DeliveryStats, SellerStats } from "../../../components/statsViews.jsx";

export default function WorkerStats() {
    const { id } = useLocalSearchParams();

    const { data: worker, loading: loadingWorker, reload: reloadWorker } = useGetData(`/users/${id}`);

    if (loadingWorker) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <>
            <Stack.Screen
                name="index"
                options={{ headerTitle: `Estadísticas ${worker.role.role_name}` }}
            />

            {worker.role_id == 2 && <SellerStats user={worker} reloadUser={reloadWorker} />}
            {worker.role_id == 3 && <DeliveryStats user={worker} reloadUser={reloadWorker} />}
        </>
    );
}
