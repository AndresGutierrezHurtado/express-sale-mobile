import React, { useState } from "react";

import { Image, Modal, Pressable, Text, View } from "react-native";
import Stars from "./stars";
import { DotsIcon, PencilIcon, ReportIcon, TrashIcon, XIcon } from "./icons";
import { useDeleteData } from "../hooks/useFetchData";

export default function Rating({ rating, reload }) {
    const [showOptions, setShowOptions] = useState(false);
    const [showEditRating, setShowEditRating] = useState(false);

    const handleDeleteRating = async () => {
        const response = await useDeleteData(`/ratings/${rating.rating_id}`);

        if (response.success) {
            setShowOptions(false);
            reload();
        }
    };

    return (
        <>
            <View className="gap-2">
                <View className="flex-row justify-between items-center">
                    <View className="flex-row gap-2 items-center">
                        <Image
                            source={{ uri: rating.calificator.user_image_url }}
                            style={{ width: 45, height: 45, objectFit: "cover" }}
                            className="rounded-full"
                        />
                        <View>
                            <Text className="text-xl font-bold">
                                {rating.calificator.user_alias}
                            </Text>
                            <Text className="leading-none">
                                {new Date(rating.rating_date).toLocaleDateString("es-CO")}
                            </Text>
                        </View>
                    </View>
                    <Pressable
                        onPress={() => setShowOptions(true)}
                        className="active:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                        <DotsIcon />
                    </Pressable>
                </View>
                <Stars value={rating.rating_value} />
                <Text>{rating.rating_comment}</Text>
                {rating?.rating_image_url && (
                    <Image
                        source={{ uri: rating.rating_image_url }}
                        style={{ width: 200, height: 200, objectFit: "contain" }}
                    />
                )}
            </View>

            <Modal visible={showOptions} animationType="slide" transparent>
                <View className="flex-1 bg-white mt-[60vh] rounded-t-[20px] border border-gray-300">
                    <View className="p-5 flex-1 gap-8">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-3xl font-bold tracking-tight mx-0.5">
                                Opciones comentario:
                            </Text>
                            <Pressable
                                onPress={() => setShowOptions(false)}
                                className="active:bg-gray-300 w-9 h-9 rounded-full flex items-center justify-center"
                            >
                                <XIcon size={25} />
                            </Pressable>
                        </View>
                        <View className="gap-2">
                            <Pressable
                                onPress={() => {
                                    setShowOptions(false);
                                    setTimeout(() => {
                                        alert("Comentario reportado");
                                    }, 500);
                                }}
                                className="w-full gap-5 p-5 flex-row items-center rounded-lg bg-gray-100"
                            >
                                <Text className="text-lg text-red-500 font-bold mx-0.5">
                                    <ReportIcon size={18} />
                                </Text>
                                <Text className="text-lg text-red-500 font-bold">
                                    Reportar comentario
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setShowOptions(false);
                                    setShowEditRating(true);
                                }}
                                className="w-full gap-5 p-5 flex-row items-center rounded-lg bg-gray-100"
                            >
                                <Text className="text-lg text-purple-700 font-bold mx-0.5">
                                    <PencilIcon size={18} />
                                </Text>
                                <Text className="text-lg text-purple-700 font-bold">
                                    Editar comentario
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={handleDeleteRating}
                                className="w-full gap-5 p-5 flex-row items-center rounded-lg bg-gray-100"
                            >
                                <Text className="text-lg text-red-500 font-bold mx-0.5">
                                    <TrashIcon size={18} />
                                </Text>
                                <Text className="text-lg text-red-500 font-bold">
                                    Eliminar comentario
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
