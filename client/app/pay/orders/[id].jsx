import React from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";

// Contexts
import { useAuthContext } from "../../../contexts/authContext";

// Hooks
import { useGetData } from "../../../hooks/useFetchData";
import { useGenerateReceipt } from "../../../hooks/useGenerateReceipt";

export default function Order() {
    const { id } = useLocalSearchParams();
    const { userSession } = useAuthContext();

    const { data: order, loading: loadingOrder, reload: reloadOrder } = useGetData(`/orders/${id}`);

    if (loadingOrder) return <ActivityIndicator size="large" color="#0000ff" />;

    return (
        <>
            <Stack.Screen options={{ headerTitle: `Pedido No° ${order.order_id.split("-")[1]}` }} />
            <View className="flex-1 px-5 py-10">
                <View className="w-full bg-white p-5 rounded-lg shadow-xl border border-gray-300 gap-10">
                    <View className="gap-5">
                        <Text className="text-3xl font-extrabold">Detalles del pedido:</Text>
                        <View className="gap-1">
                            <Text className="text-xl font-extrabold">Comprador: </Text>

                            <View className="flex-row items-center gap-2">
                                <Text className="font-bold text-lg">Nombre:</Text>
                                <Text className="text-lg">{order.paymentDetails.buyer_name}</Text>
                            </View>
                            <View className="flex-row gap-2">
                                <Text className="font-bold text-lg">Correo:</Text>
                                <Text className="text-lg">{order.paymentDetails.buyer_email}</Text>
                            </View>
                            <View className="flex-row gap-2">
                                <Text className="font-bold text-lg">Telefono:</Text>
                                <Text className="text-lg">{order.paymentDetails.buyer_phone}</Text>
                            </View>
                        </View>
                        <View className="gap-1">
                            <Text className="text-xl font-extrabold">Compra:</Text>
                            <View className="flex-row gap-2">
                                <Text className="font-bold text-lg">Metodo de pago:</Text>
                                <Text className="text-lg">
                                    {order.paymentDetails.payment_method}
                                </Text>
                            </View>
                            <View className="flex-row gap-2">
                                <Text className="font-bold text-lg">Total:</Text>
                                <Text className="text-lg">
                                    {parseInt(order.paymentDetails.payment_amount).toLocaleString(
                                        "es-CO"
                                    )}{" "}
                                    COP
                                </Text>
                            </View>
                            <View className="flex-row gap-2">
                                <Text className="font-bold text-lg">Repartidor:</Text>
                                <Text className="text-lg">
                                    {order.shippingDetails.worker
                                        ? `${order.shippingDetails.worker.user.user_name} ${order.shippingDetails.worker.user.user_lastname}`
                                        : "Pendiente"}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Pressable
                                onPress={() => {
                                    useGenerateReceipt(order, userSession);
                                }}
                                className="bg-gray-200 w-fit px-3 py-2 justify-center border border-gray-300 rounded-md active:bg-gray-300"
                            >
                                <Text className="text-center text-gray-800 font-medium text-xl">
                                    Descargar factura
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <View className="border-b border-gray-300"></View>
                    <View className="gap-5">
                        {order.orderProducts.map((product) => (
                            <View
                                key={product.product_id}
                                className="flex-row gap-5 border border-gray-300 rounded-xl p-3"
                            >
                                <Link href={`/products/${product.product_id}`}>
                                    <Image
                                        source={{ uri: product.product.product_image_url }}
                                        style={{ width: 100, height: 100, objectFit: "contain" }}
                                    />
                                </Link>
                                <View>
                                    <Text className="text-xl font-extrabold tracking-tight">{product.product.product_name}</Text>
                                    <Link asChild href={`/worker/${product.product.user.user_id}`}>
                                        <Text className="italic underline text-gray-600">
                                            {product.product.user.user_alias}
                                        </Text>
                                    </Link>
                                    <Text className="text-lg">
                                        {parseInt(product.product_price * product.product_quantity).toLocaleString("es-CO")}{" "}
                                        COP
                                    </Text>
                                </View>
                            </View>
                        ))}

                        <Pressable onPress={() => router.back()} className="bg-gray-200 w-fit px-3 py-2 justify-center border border-gray-300 rounded-md active:bg-gray-300">
                            <Text className="text-center text-gray-800 font-medium text-xl">
                                Volver
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    );
}
