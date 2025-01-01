import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function Stars({ value, size }) {
    return (
        <View className="flex-row">
            {[1, 2, 3, 4, 5].map((star, index) => (
                <View key={index}>
                    <AntDesign
                        name={star <= value ? "star" : "staro"}
                        size={size || 23}
                        color="#7E22CE"
                        className="mx-0.5"
                    />
                </View>
            ))}
        </View>
    );
}
