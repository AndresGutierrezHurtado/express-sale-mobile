import React from "react";

import { Image, Text, View } from "react-native";
import Stars from "./stars";

export default function Rating({ rating }) {
    return (
        <View className="gap-2">
            <View className="flex-row justify-between items-center">
                <View className="flex-row gap-2 items-center">
                    <Image
                        source={{ uri: rating.calificator.user_image_url }}
                        style={{ width: 45, height: 45, objectFit: "cover" }}
                        className="rounded-full"
                    />
                    <View>
                        <Text className="text-xl font-bold">{rating.calificator.user_alias}</Text>
                        <Text className="leading-none">
                            {new Date(rating.rating_date).toLocaleDateString("es-CO")}
                        </Text>
                    </View>
                </View>
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
    );
}
