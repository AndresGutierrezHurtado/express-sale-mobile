import React, { useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";

// Hooks
import { useGetData } from "../../hooks/useFetchData";
import { useAddCart } from "../../hooks/useCart";

// Components
import { CartPlusIcon } from "../../components/icons";
import Rating from "../../components/rating";
import RateModal from "../../components/rateModal";

export default function Product() {
    const [currentImage, setCurrentImage] = useState(0);
    const [ratingModalOpen, setRatingModalOpen] = useState(false);

    const { id } = useLocalSearchParams();
    const { data: product, loading: loadingProduct } = useGetData(`/products/${id}`);
    const {
        data: productRatings,
        loading: loadingProductRatings,
        reload: reloadProductRatings,
    } = useGetData(`/products/${id}/ratings`);

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
                            <View className="flex-row justify-center">
                                <Pressable
                                    onPress={async () => await useAddCart(product.product_id)}
                                    className="m-1 grow bg-purple-700 py-3 px-5 rounded-md active:bg-purple-800"
                                >
                                    <Text className="text-lg text-white text-center">
                                        <CartPlusIcon size={17} />
                                        {"   "}
                                        Agregar al carrito
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => setRatingModalOpen(true)}
                                    className="w-fit m-1 grow bg-gray-300 py-3 px-5 rounded-md active:bg-gray-200"
                                >
                                    <Text className="text-lg text-center text-gray-800 font-bold">
                                        Calificar
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="w-full p-5 gap-5">
                    <Text className="text-3xl font-bold tracking-tight leading-none">
                        Calificaciones:
                    </Text>
                    {productRatings.length === 0 && <Text>No hay calificaciones...</Text>}
                    <View>
                        <FlatList
                            data={productRatings}
                            keyExtractor={(rating) => rating.rating_id}
                            renderItem={({ item }) => <Rating rating={item} />}
                        />
                    </View>
                </View>
            </View>
            <RateModal
                isModalOpen={ratingModalOpen}
                setModalOpen={setRatingModalOpen}
                reload={reloadProductRatings}
                id={product.product_id}
                type="product"
            />
        </>
    );
}
