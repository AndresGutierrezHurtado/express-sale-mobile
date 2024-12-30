import React from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

// Hooks
import { useGetData } from "../../hooks/useFetchData";

export default function WorkerProfile() {
    const { id } = useLocalSearchParams();
    const {
        data: worker,
        loading: loadingWorker,
        reloading: reloadingWorker,
    } = useGetData(`/users/${id}`);

    if (loadingWorker) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <>
            <Stack.Screen options={{ headerTitle: `Perfil de ${worker.user_name}`, headerTitleAlign: "center" }} />
            <View className="w-full">
                <View className="w-full px-5 py-10 gap-5 items-center">
                    <View className="w-full items-center gap-3">
                        <Image
                            source={{ uri: worker.user_image_url }}
                            className="w-20 h-20 rounded-full"
                            style={{ width: 120, height: 120, objectFit: "cover" }}
                        />
                        <View>
                            <Text className="text-2xl font-semibold text-center">
                                @{worker.user_alias}
                            </Text>
                            <Text className="text-lg text-gray-500 font-medium text-center">
                                {worker.role.role_name}
                            </Text>
                        </View>
                    </View>
                    <View className="w-full flex-row gap-4 justify-center items-center">
                        <Pressable className="px-3 py-1 bg-purple-700 rounded-lg">
                            <Text className="text-lg text-red-100 font-semibold">Calificar</Text>
                        </Pressable>
                    </View>
                    <Text>{worker.worker.worker_description}</Text>
                </View>
            </View>
        </>
    );
}
