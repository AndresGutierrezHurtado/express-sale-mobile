import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";

// Hooks
import { useGetData } from "../../hooks/useFetchData";
import { useAddCart } from "../../hooks/useCart";

// Components
import { CartPlusIcon, ProfileIcon, StarIcon } from "../../components/icons";
import Rating from "../../components/rating";
import RateModal from "../../components/rateModal";

export default function Product() {
    const [currentImage, setCurrentImage] = useState(0);
    const [ratingModalOpen, setRatingModalOpen] = useState(false);

    const { id } = useLocalSearchParams();
    const {
        data: product,
        loading: loadingProduct,
        reload: reloadProduct,
    } = useGetData(`/products/${id}`);
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
            <ScrollView>
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
                                        @{product.user.user_alias}
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
                        <View className="flex-row w-6/12">
                            <View className="items-center px-5">
                                <View className="flex-row gap-2 items-center">
                                    <Text className="text-5xl font-bold leading-[1.25] text-gray-700">
                                        {(parseInt(product.average_rating * 10) / 10).toFixed(1)}
                                        <StarIcon size={50} />
                                    </Text>
                                </View>
                                <View className="flex-row gap-1 items-center">
                                    <Text className="text-xl font-bold">
                                        {product.ratings_count}
                                    </Text>
                                    <ProfileIcon size={20} />
                                </View>
                            </View>
                            <View className="gap-1">
                                <View className="flex-row items-center gap-4">
                                    <Text>5</Text>
                                    <View className="w-full bg-gray-300 rounded-[10px] overflow-hidden h-2.5">
                                        <View
                                            className="bg-purple-700 h-2.5 rounded-[10px]"
                                            style={{
                                                width: `${
                                                    (productRatings.filter(
                                                        (rating) => rating.rating_value == 5
                                                    ).length /
                                                        product.ratings_count) *
                                                        100 || 0
                                                }%`,
                                            }}
                                        />
                                    </View>
                                </View>
                                <View className="flex-row items-center gap-4">
                                    <Text>4</Text>
                                    <View className="w-full bg-gray-300 rounded-[10px] overflow-hidden h-2.5">
                                        <View
                                            className="bg-purple-700 h-2.5 rounded-[10px]"
                                            style={{
                                                width: `${
                                                    (productRatings.filter(
                                                        (rating) => rating.rating_value == 4
                                                    ).length /
                                                        product.ratings_count) *
                                                        100 || 0
                                                }%`,
                                            }}
                                        />
                                    </View>
                                </View>
                                <View className="flex-row items-center gap-4">
                                    <Text>3</Text>
                                    <View className="w-full bg-gray-300 rounded-[10px] overflow-hidden h-2.5">
                                        <View
                                            className="bg-purple-700 h-2.5 rounded-[10px]"
                                            style={{
                                                width: `${
                                                    (productRatings.filter(
                                                        (rating) => rating.rating_value == 3
                                                    ).length /
                                                        product.ratings_count) *
                                                        100 || 0
                                                }%`,
                                            }}
                                        />
                                    </View>
                                </View>
                                <View className="flex-row items-center gap-4">
                                    <Text>2</Text>
                                    <View className="w-full bg-gray-300 rounded-[10px] overflow-hidden h-2.5">
                                        <View
                                            className="bg-purple-700 h-2.5 rounded-[10px]"
                                            style={{
                                                width: `${
                                                    (productRatings.filter(
                                                        (rating) => rating.rating_value == 2
                                                    ).length /
                                                        product.ratings_count) *
                                                        100 || 0
                                                }%`,
                                            }}
                                        />
                                    </View>
                                </View>
                                <View className="flex-row items-center gap-4">
                                    <Text>1</Text>
                                    <View className="w-full bg-gray-300 rounded-[10px] overflow-hidden h-2.5">
                                        <View
                                            className="bg-purple-700 h-2.5 rounded-[10px]"
                                            style={{
                                                width: `${
                                                    (productRatings.filter(
                                                        (rating) => rating.rating_value == 1
                                                    ).length /
                                                        product.ratings_count) *
                                                        100 || 0
                                                }%`,
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text className="text-2xl font-bold tracking-tight leading-none">
                            Comentarios:
                        </Text>
                        {productRatings.length === 0 && <Text>No hay calificaciones...</Text>}
                        <View className="gap-5">
                            {productRatings.map((rating) => (
                                <Rating
                                    key={rating.rating_id}
                                    rating={rating}
                                    reload={() => {
                                        reloadProductRatings();
                                        reloadProduct();
                                    }}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <RateModal
                isModalOpen={ratingModalOpen}
                setModalOpen={setRatingModalOpen}
                reload={() => {
                    reloadProduct();
                    reloadProductRatings();
                }}
                id={product.product_id}
                type="product"
            />
        </>
    );
}
