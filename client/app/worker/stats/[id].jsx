import React from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { LineChart } from "react-native-chart-kit";

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
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                ],
                            },
                        ],
                    }}
                    width={350}
                    height={220}
                    chartConfig={{
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </View>
        </>
    );
}
