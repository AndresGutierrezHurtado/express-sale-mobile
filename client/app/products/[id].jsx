import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import { useGetData } from "../../hooks/useFetchData";

export default function Product() {

    const { id } = useLocalSearchParams();
    const { data: product, loading: loadingProduct } = useGetData(`/products/${id}`);

    if (loadingProduct) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            <Stack.Screen options={{headerTitle: ""}} />
            <Text>{product.product_name}</Text>
        </View>
    );
}
