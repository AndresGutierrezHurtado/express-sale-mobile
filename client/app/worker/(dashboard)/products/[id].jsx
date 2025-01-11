import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

// Hooks
import { useGetData } from "../../../../hooks/useFetchData";

export default function ProductProfile() {
    const { id } = useLocalSearchParams();

    const {
        data: product,
        loading: loadingProduct,
        reload: reloadProduct,
    } = useGetData(`/products/${id}`);

    if (loadingProduct) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <>
            <Stack.Screen options={{ headerTitle: "Editar producto" }} />
            <View className="w-full">
                <View className="w-full p-5">
                    <Image
                        source={{ uri: product.product_image_url }}
                        style={{ width: 200, height: 200, objectFit: "contain" }}
                    />
                    <Text>{product.product_name}</Text>
                    <Text>{product.product_description}</Text>
                    <Text>{product.product_price}</Text>
                    <Text>{product.product_quantity}</Text>
                </View>
            </View>
        </>
    );
}
