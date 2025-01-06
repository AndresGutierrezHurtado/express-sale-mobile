import React, { useState } from "react";

import { Image, Modal, Pressable, Text, View } from "react-native";
import Stars from "./stars";
import { DotsIcon, XIcon } from "./icons";

export default function Rating({ rating }) {
    const [showOptions, setShowOptions] = useState(false);

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
                <View className="flex-1 bg-white mt-[150px] rounded-t-[20px] border border-gray-300">
                    <View className="p-5 flex-1">
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
                    </View>
                </View>
            </Modal>
        </>
    );
}
