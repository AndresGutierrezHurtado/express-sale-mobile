import React from "react";

import { Image, Text, View } from "react-native";

export default function Rating({ rating }) {
    return (
        <View>
            <Image source={{ uri: rating.rating_image_url }} />
            <Text>{rating.rating_comment}</Text>
            <Text>{rating.user.user_alias}</Text>
            <Text>{rating.rating_value}</Text>
            <Text>{new Date(rating.rating_date).toLocaleString("es-CO")}</Text>
        </View>
    );
}
