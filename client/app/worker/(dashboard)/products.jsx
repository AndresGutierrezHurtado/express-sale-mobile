import React, { useState } from "react";
import { Stack } from "expo-router";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

// Hooks
import { usePaginateData } from "../../../hooks/useFetchData";

// Contexts
import { useAuthContext } from "../../../contexts/authContext";

export default function WorkerProducts() {
    const { userSession } = useAuthContext();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const {
        data: products,
        loading: loadingProducts,
        reload: reloadProducts,
        count: countProducts,
    } = usePaginateData(`/users/${userSession.user_id}/products?search=${search}&page=${page}`);

    if (loadingProducts) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <>
            <Stack.Screen options={{ headerTitle: "Tus Productos" }} />
            <View className="w-full">
                <View className="w-full p-5">
                    <TextInput
                        placeholder="Buscar producto"
                        className="bg-white border border-gray-400 rounded-md p-2 mb-2"
                        value={search}
                        onChangeText={(value) => {
                            setSearch(value);
                        }}
                    />

                    <View>
                        {products.map((product, index) => (
                            <View key={index} className="w-full p-5 gap-5">
                                <View className="w-full flex-row items-center justify-between">
                                    <Text className="font-extrabold">{product.product_name}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View className="flex-row items-center justify-between w-full bg-white p-3 rounded-lg border border-gray-200">
                        <Text className="m-0.5">
                            {`Mostrando ${(page - 1) * 5} - ${
                                (page - 1) * 5 + products.length
                            } de ${countProducts}`}
                        </Text>
                        <View className="flex-row justify-center gap-2">
                            <Pressable
                                onPress={() => setPage(page - 1)}
                                disabled={page <= 1}
                                className="bg-gray-300 rounded-lg px-3 py-2 active:bg-gray-500 disabled:opacity-50"
                            >
                                <Text className="mx-0.5">Prev</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setPage(page + 1)}
                                disabled={page == Math.ceil(products.length / 5)}
                                className="bg-gray-300 rounded-lg px-3 py-2 active:bg-gray-500 disabled:opacity-50"
                            >
                                <Text className="mx-0.5">Next</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}
