import React, { useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";

// Hooks
import { useGetData } from "../../hooks/useFetchData";
import { useAddCart } from "../../hooks/useCart";

// Components
import { CartPlusIcon } from "../../components/icons";

export default function Product() {
    const [currentImage, setCurrentImage] = useState(0);

    const { id } = useLocalSearchParams();
    const { data: product, loading: loadingProduct } = useGetData(`/products/${id}`);
    const { data: productRatings, loading: loadingProductRatings } = useGetData(
        `/products/${id}/ratings`
    );

    if (loadingProduct || loadingProductRatings) {
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
                        <FlatList
                            horizontal={true}
                            className="border p-3 w-full gap-5"
                            data={images}
                            keyExtractor={(image) => image.id}
                            renderItem={({ item, index }) => (
                                <Pressable key={item.id} onPress={() => setCurrentImage(index)}>
                                    <Image
                                        source={{ uri: item.url }}
                                        style={{ width: 90, height: 90, objectFit: "contain" }}
                                        className={`${
                                            currentImage === index
                                                ? "border-2 border-purple-700"
                                                : "border border-gray-500 opacity-50 scale-[0.8]"
                                        }`}
                                    />
                                </Pressable>
                            )}
                        />
                    </View>
                    <View className="gap-5">
                        <View className="">
                            <Text className="text-4xl font-bold tracking-tight leading-none">
                                {product.product_name}
                            </Text>
                            <Text className="text-gray-600 leading-none">
                                {"publicado por "}
                                <Link
                                    href={`worker/${product.user_id}`}
                                    className="italic underline"
                                >
                                    @{product.user.user_name}
                                </Link>
                            </Text>
                        </View>

                        <Text className="text-lg font-medium tracking-tight leading-none text-gray-600">
                            {product.product_description}
                        </Text>

                        <View className="gap-2">
                            <Text>{product.product_quantity} Unidades disponibles</Text>
                            <Text className="text-2xl font-extrabold tracking-tight leading-none">
                                {parseInt(product.product_price).toLocaleString("es-CO")} COP
                            </Text>
                            <Pressable
                                onPress={async () => await useAddCart(product.product_id)}
                                className="w-full bg-purple-700 p-3 rounded-md active:bg-purple-800"
                            >
                                <Text className="text-white text-center">
                                    <CartPlusIcon />
                                    {"   "}
                                    Agregar al carrito
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View className="w-full p-5 gap-5">
                    <Text className="text-3xl font-bold tracking-tight leading-none">
                        Calificaciones:
                    </Text>
                    <View>
                        <FlatList
                            data={productRatings}
                            keyExtractor={(rating) => rating.rating_id}
                            renderItem={({ item }) => (
                                <View className="flex-row items-center gap-3">
                                    <Image
                                        source={{ uri: item.user.user_image_url }}
                                        style={{ width: 50, height: 50, objectFit: "contain" }}
                                    />
                                    <Text className="text-lg font-medium tracking-tight leading-none">
                                        {item.user.user_name}
                                    </Text>
                                    <Text className="text-lg font-medium tracking-tight leading-none">
                                        {item.rating}
                                    </Text>
                                    <Text>{item.rating_comment}</Text>
                                    <Pressable className="w-full bg-purple-700 p-3 rounded-md active:bg-purple-800">
                                        :
                                    </Pressable>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </View>
        </>
    );
}
