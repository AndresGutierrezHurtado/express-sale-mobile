import React, { useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

// Hooks
import { useGetData } from "../../hooks/useFetchData";

// Components
import { CartPlusIcon } from "../../components/icons";

export default function Product() {
    const { id } = useLocalSearchParams();
    const { data: product, loading: loadingProduct } = useGetData(`/products/${id}`);
    const [currentImage, setCurrentImage] = useState(0);

    if (loadingProduct) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const images = [
        {
            id: product.product_id,
            url: product.product_image_url,
        },
        ...product.medias.map((media) => ({
            id: media.media_id,
            url: media.media_url,
        })),
    ];

    return (
        <>
            <Stack.Screen
                options={{ headerTitle: "", headerTransparent: true, headerShown: true }}
            />
            <View className="bg-white flex-1" style={{ paddingTop: 60 }}>
                <View className="w-full p-5 gap-5">
                    <View className="items-center">
                        <View className="border w-full">
                            <Image
                                source={{ uri: images[currentImage].url }}
                                style={{ width: "100%", height: 200, objectFit: "contain" }}
                            />
                        </View>
                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={{ gap: 10 }}
                            className="border p-3 w-full"
                        >
                            {images.map((image, index) => (
                                <Pressable key={image.id} onPress={() => setCurrentImage(index)}>
                                    <Image
                                        source={{ uri: image.url }}
                                        style={{ width: 90, height: 90, objectFit: "contain" }}
                                        className={`${
                                            currentImage === index
                                                ? "border-2 border-purple-700"
                                                : "border border-gray-500 opacity-50 scale-[0.8]"
                                        }`}
                                    />
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                    <View className="gap-2">
                        <Text className="text-4xl font-bold tracking-tight leading-none">
                            {product.product_name}
                        </Text>
                        <Text className="text-lg font-bold tracking-tight leading-none text-gray-600">
                            {product.product_description}
                        </Text>
                        <Text>{product.product_quantity} Unidades disponibles</Text>
                        <Text className="text-2xl font-extrabold tracking-tight leading-none">
                            {parseInt(product.product_price).toLocaleString("es-CO")} COP
                        </Text>
                        <Pressable className="w-full bg-purple-700 p-3 rounded-md active:bg-purple-800">
                            <Text className="text-white text-center">
                                <CartPlusIcon />
                                {"    "}
                                Agregar al carrito
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    );
}
