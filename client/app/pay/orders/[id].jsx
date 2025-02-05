import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

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
                                    {parseInt(order.paymentDetails.payment_amount).toLocaleString("es-CO")} COP
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
                            <Pressable onPress={() => {useGenerateReceipt(order, userSession)}} className="bg-gray-200 w-fit px-3 py-2 justify-center border border-gray-300 rounded-md active:bg-gray-300">
                                <Text className="text-center text-gray-800 font-medium text-xl">Descargar factura</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View className="border-b border-gray-300"></View>
                    <View className="flex-row justify-between items-center mt-5">
                        <Text className="text-lg font-bold">Costo total</Text>
                        <Text className="text-lg font-bold">
                            {order.paymentDetails.payment_amount}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
}
