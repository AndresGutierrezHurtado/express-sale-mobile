import React from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { Link, router } from "expo-router";

// Hooks
import { useGetData } from "../../hooks/useFetchData";
import { useRemoveCart, useUpdateCart } from "../../hooks/useCart";

// Contexts
import { useAuthContext } from "../../contexts/authContext";

// Middlewares
import { useRouteMiddleware } from "../../middlewares/useRouteMiddleware";

export default function Cart() {
    const { userSession } = useAuthContext();

    useRouteMiddleware([!userSession]);

    const {
        data: carts,
        loading: loadingCarts,
        reload: reloadCarts,
    } = useGetData(`/users/${userSession?.user_id || 0}/carts`);

    if (loadingCarts) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <ScrollView className="w-full">
            <View className="w-full px-5 py-10 pb-[100px]">
                <View className="gap-10">
                    <View
                        className="w-full h-fit p-5 bg-white rounded-lg gap-5 shadow-lg"
                    >
                        <Text className="text-4xl font-extrabold tracking-tight">Carrito</Text>
                        <View>
                            <View className="flex-row justify-between">
                                <Text className="text-2xl font-extrabold">Envio:</Text>
                                <Text className="text-xl font-medium">pendiente</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-2xl font-extrabold">Total:</Text>
                                <Text className="text-xl font-medium">
                                    {carts
                                        .reduce(
                                            (total, cart) =>
                                                total +
                                                parseInt(
                                                    cart.product.product_price *
                                                        cart.product_quantity
                                                ),
                                            0
                                        )
                                        .toLocaleString("es-CO")}
                                    {" COP"}
                                </Text>
                            </View>
                            <Pressable
                                onPress={() => router.push("/pay/form")}
                                disabled={carts.length === 0}
                                className="mt-5 py-2 px-10 bg-purple-700 rounded-lg active:bg-purple-800 disabled:opacity-50"
                            >
                                <Text className="text-white text-lg text-center font-bold">
                                    Pagar
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    {carts.length === 0 && <Text>No tienes productos en el carrito.</Text>}
                    {carts.length > 0 && (
                        <Text className="text-4xl font-extrabold tracking-tight">Productos:</Text>
                    )}
                    <View className="gap-5">
                        {carts.map((cart) => (
                            <View
                                key={cart.cart_id}
                                className="w-full h-[150px] flex-row bg-white rounded-lg shadow-lg"
                            >
                                <View className="w-full h-full flex-row p-5 gap-4">
                                    <Link href={`/products/${cart.product.product_id}`}>
                                        <Image
                                            source={{ uri: cart.product.product_image_url }}
                                            style={{
                                                width: 100,
                                                height: "100%",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </Link>
                                    <View className="grow max-w-[40%] overflow-auto">
                                        <View className="grow">
                                            <Text className="text-2xl font-extrabold text-black leading-none line-clamp-2">
                                                {cart.product.product_name}
                                            </Text>
                                            <Text>
                                                {parseInt(
                                                    cart.product.product_price
                                                ).toLocaleString("es-CO")}
                                                {" COP"}
                                            </Text>
                                            <Text>cantidad: {cart.product_quantity}</Text>
                                        </View>
                                        <Text>
                                            Total:{" "}
                                            {parseInt(
                                                cart.product.product_price * cart.product_quantity
                                            ).toLocaleString("es-CO")}
                                        </Text>
                                    </View>
                                    <View className="justify-center gap-2">
                                        <Pressable
                                            onPress={() =>
                                                useUpdateCart(
                                                    cart.cart_id,
                                                    cart.product_quantity + 1,
                                                    reloadCarts
                                                )
                                            }
                                            disabled={
                                                cart.product_quantity ===
                                                cart.product.product_quantity
                                            }
                                            className="bg-gray-300 p-2 rounded-lg active:opacity-50 disabled:opacity-50"
                                        >
                                            <Text className="text-gray-800 text-center font-semibold">
                                                Añadir
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            onPress={() =>
                                                useUpdateCart(
                                                    cart.cart_id,
                                                    cart.product_quantity - 1,
                                                    reloadCarts
                                                )
                                            }
                                            disabled={cart.product_quantity === 1}
                                            className="bg-gray-300 p-2 rounded-lg active:opacity-50 disabled:opacity-50"
                                        >
                                            <Text className="text-gray-800 text-center font-semibold">
                                                Quitar
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            onPress={() => useRemoveCart(cart.cart_id, reloadCarts)}
                                            className="bg-red-500 p-2 rounded-lg active:opacity-50 disabled:opacity-50"
                                        >
                                            <Text className="text-white text-center font-semibold">
                                                Eliminar
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
