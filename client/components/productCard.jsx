import React from "react";
import { Text, Image, Pressable, View } from "react-native";
import { Link } from "expo-router";

// Components
import { CartPlusIcon, StarIcon } from "./icons";

// Hooks
import { useAddCart } from "../hooks/useCart";

export default function ProductCard({ product }) {
    return (
        <View className="bg-white p-4 shadow-xl rounded-md w-[175px] min-h-[205px]">
            <Link asChild href={`/products/${product.product_id}`}>
                <Pressable className="items-center">
                    <Image
                        source={{ uri: product.product_image_url }}
                        style={{ width: 105, height: 105, objectFit: "contain" }}
                    />
                </Pressable>
            </Link>
            <View className="grow pb-2">
                <Text className="font-extrabold text-xl leading-none line-clamp-2">
                    {product.product_name}
                </Text>
                <Text className="">
                    {parseInt(product.product_price).toLocaleString("es-CO")} COP
                </Text>
            </View>
            <View className="flex-row justify-between items-center p-1 w-full">
                <Link asChild href={`/products/${product.product_id}`}>
                    <Pressable className="bg-purple-700 h-[30px_!important] w-fit px-3 justify-center rounded-md active:bg-purple-800">
                        <Text className="text-white">Ver</Text>
                    </Pressable>
                </Link>
                <Pressable
                    onPress={async () => await useAddCart(product.product_id)}
                    className="bg-purple-700 h-[30px_!important] w-fit px-3 justify-center rounded-md active:bg-purple-800"
                >
                    <Text className="text-white">
                        <CartPlusIcon size={16} />
                    </Text>
                </Pressable>
            </View>
            <View
                className={`p-2.5 rounded-lg ${
                    product.average_rating < 2
                        ? product.average_rating == 0
                            ? "bg-gray-500"
                            : "bg-red-500"
                        : product.average_rating < 4
                        ? "bg-yellow-500"
                        : "bg-green-500"
                } aspect-square absolute top-[-10px] right-[-10px]`}
            >
                <Text className="font-bold text-white text-sm">
                    {(parseInt(product.average_rating * 10) / 10).toFixed(1) + " "}
                    <StarIcon size={12} />
                </Text>
            </View>
        </View>
    );
}
