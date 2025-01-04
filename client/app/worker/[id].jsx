import React, { useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

// Hooks
import { useGetData, usePaginateData } from "../../hooks/useFetchData";

// Components
import ProductCard from "../../components/productCard";
import Rating from "../../components/rating";
import RateModal from "../../components/rateModal";
import { ProfileIcon, StarIcon } from "../../components/icons";

export default function WorkerProfile() {
    const [limit, setLimit] = useState(4);
    const [ratingModalOpen, setRatingModalOpen] = useState(false);

    const { id } = useLocalSearchParams();
    const {
        data: worker,
        loading: loadingWorker,
        reload: reloadWorker,
    } = useGetData(`/users/${id}`);

    const {
        data: workerProducts,
        count: countWorkerProducts,
        loading: loadingWorkerProducts,
        reload: reloadWorkerProducts,
    } = usePaginateData(`/users/${id}/products?limit=${limit}`);

    const {
        data: workerRatings,
        count: countWorkerRatings,
        loading: loadingWorkerRatings,
        reload: reloadWorkerRatings,
    } = useGetData(`/users/${id}/ratings`);

    if (loadingWorker || loadingWorkerProducts || loadingWorkerRatings)
        return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: `Perfil de ${worker.user_name}`,
                    headerTitleAlign: "center",
                }}
            />
            <ScrollView className="w-full">
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
                            <Text className="text-lg text-center">
                                {worker.worker.worker_description}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row w-full">
                        <View className="items-center px-5">
                            <View className="flex-row gap-2 items-center">
                                <Text className="text-5xl font-bold leading-[1.25] text-gray-700">
                                    {parseInt(worker.average_rating * 10) / 10}
                                    <StarIcon size={50} />
                                </Text>
                            </View>
                            <View className="flex-row gap-1 items-center">
                                <Text className="text-xl font-bold">{worker.ratings_count}</Text>
                                <ProfileIcon size={20} />
                            </View>
                        </View>
                        <View className="gap-1">
                            <View className="flex-row items-center gap-4">
                                <Text>5</Text>
                                <View className="w-8/12 bg-gray-300 rounded-[10px] overflow-hidden h-2.5">
                                    <View
                                        className="bg-purple-700 h-2.5 rounded-[10px]"
                                        style={{
                                            width: `${
                                                (workerRatings.filter(
                                                    (rating) => rating.rating_value == 5
                                                ).length /
                                                    worker.ratings_count) *
                                                    100 || 0
                                            }%`,
                                        }}
                                    />
                                </View>
                            </View>
                            <View className="flex-row items-center gap-4">
                                <Text>4</Text>
                                <View className="w-8/12 bg-gray-300 rounded-[10px] overflow-hidden h-2.5">
                                    <View
                                        className="bg-purple-700 h-2.5 rounded-[10px]"
                                        style={{
                                            width: `${
                                                (workerRatings.filter(
                                                    (rating) => rating.rating_value == 4
                                                ).length /
                                                    worker.ratings_count) *
                                                    100 || 0
                                            }%`,
                                        }}
                                    />
                                </View>
                            </View>
                            <View className="flex-row items-center gap-4">
                                <Text>3</Text>
                                <View className="w-8/12 bg-gray-300 rounded-[10px] overflow-hidden h-2.5">
                                    <View
                                        className="bg-purple-700 h-2.5 rounded-[10px]"
                                        style={{
                                            width: `${
                                                (workerRatings.filter(
                                                    (rating) => rating.rating_value == 3
                                                ).length /
                                                    worker.ratings_count) *
                                                    100 || 0
                                            }%`,
                                        }}
                                    />
                                </View>
                            </View>
                            <View className="flex-row items-center gap-4">
                                <Text>2</Text>
                                <View className="w-8/12 bg-gray-300 rounded-[10px] overflow-hidden h-2.5">
                                    <View
                                        className="bg-purple-700 h-2.5 rounded-[10px]"
                                        style={{
                                            width: `${
                                                (workerRatings.filter(
                                                    (rating) => rating.rating_value == 2
                                                ).length /
                                                    worker.ratings_count) *
                                                    100 || 0
                                            }%`,
                                        }}
                                    />
                                </View>
                            </View>
                            <View className="flex-row items-center gap-4">
                                <Text>1</Text>
                                <View className="w-8/12 bg-gray-300 rounded-[10px] overflow-hidden h-2.5">
                                    <View
                                        className="bg-purple-700 h-2.5 rounded-[10px]"
                                        style={{
                                            width: `${
                                                (workerRatings.filter(
                                                    (rating) => rating.rating_value == 1
                                                ).length /
                                                    worker.ratings_count) *
                                                    100 || 0
                                            }%`,
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="w-full flex-row gap-4 justify-center items-center">
                        <Pressable
                            onPress={() => setRatingModalOpen(true)}
                            className="px-5 py-2 bg-purple-700 rounded-lg"
                        >
                            <Text className="text-lg text-red-100 font-semibold">Calificar</Text>
                        </Pressable>
                    </View>
                </View>

                {worker.role_id == 2 && (
                    <View className="w-full px-5 py-10 gap-8 ">
                        <Text className="text-3xl font-extrabold">Productos:</Text>
                        <View className="flex-row justify-between flex-wrap gap-5">
                            {workerProducts.map((product) => (
                                <ProductCard key={product.product_id} product={product} />
                            ))}
                        </View>
                        <View className="flex-row justify-between items-center gap-5">
                            {limit > 4 && countWorkerProducts > 4 && (
                                <Pressable
                                    onPress={() => setLimit((prev) => prev - 4)}
                                    className="bg-gray-300 h-[40px] grow justify-center items-center rounded-md active:bg-gray-200"
                                >
                                    <Text className="text-xl font-bold">Ver menos</Text>
                                </Pressable>
                            )}
                            <Pressable
                                onPress={() => setLimit((prev) => prev + 4)}
                                disabled={limit >= countWorkerProducts}
                                className="bg-gray-300 h-[40px] grow justify-center items-center rounded-md active:bg-gray-200 disabled:opacity-50"
                            >
                                <Text className="text-xl font-bold">Cargar más</Text>
                            </Pressable>
                        </View>
                    </View>
                )}

                <View className="w-full p-5 gap-5">
                    {worker.ratings_count === 0 && <Text>No hay calificaciones...</Text>}
                    <Text className="text-2xl font-bold">Comentarios:</Text>
                    <View className="gap-7">
                        {workerRatings.map((rating) => (
                            <Rating key={rating.rating_id} rating={rating} />
                        ))}
                    </View>
                </View>
            </ScrollView>
            <RateModal
                isModalOpen={ratingModalOpen}
                setModalOpen={setRatingModalOpen}
                reload={() => {
                    reloadWorkerRatings();
                    reloadWorker();
                }}
                id={id}
                type="user"
            />
        </>
    );
}
