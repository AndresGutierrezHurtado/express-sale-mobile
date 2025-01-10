import React, { useState } from "react";
import { Stack } from "expo-router";
import { ActivityIndicator, Modal, Pressable, Text, TextInput, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Formik } from "formik";

// Hooks
import { useDeleteData, usePaginateData } from "../../../hooks/useFetchData";

// Contexts
import { useAuthContext } from "../../../contexts/authContext";
import { PencilIcon, TrashIcon, XIcon } from "../../../components/icons";

export default function WorkerProducts() {
    const { userSession } = useAuthContext();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [showCreate, setShowCreate] = useState(false);

    const {
        data: products,
        loading: loadingProducts,
        reload: reloadProducts,
        count: countProducts,
    } = usePaginateData(`/users/${userSession.user_id}/products?search=${search}&page=${page}`);

    const handleDeleteProduct = async (id) => {
        const response = await useDeleteData(`/products/${id}`);

        if (response.success) reloadProducts();
    };

    if (loadingProducts) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <>
            <Stack.Screen options={{ headerTitle: "Tus Productos" }} />
            <View className="w-full">
                <View className="w-full p-5 gap-8">
                    <TextInput
                        placeholder="Buscar producto"
                        className="bg-white border border-gray-400 rounded-md p-2 mb-2"
                        value={search}
                        onChangeText={(value) => {
                            setSearch(value);
                        }}
                    />

                    <Table
                        borderStyle={{ borderWidth: 1, borderColor: "black" }}
                        style={{ backgroundColor: "white" }}
                    >
                        <Row
                            data={["ID", "Nombre", "Stock", "Editar", "Eliminar"]}
                            style={{ backgroundColor: "lightgray" }}
                            textStyle={{ padding: 5 }}
                        />
                        <Rows
                            data={products.map((product) => [
                                product.product_id.split("-")[1],
                                product.product_name,
                                product.product_quantity,
                                <Pressable className="bg-purple-700 px-2 py-2 rounded-md w-10 m-auto active:bg-purple-800">
                                    <PencilIcon size={18} color="#fff" />
                                </Pressable>,
                                <Pressable
                                    onPress={() => handleDeleteProduct(product.product_id)}
                                    className="bg-red-500 px-2 py-2 rounded-md w-10 m-auto active:bg-red-700"
                                >
                                    <TrashIcon size={17} color="#fff" />
                                </Pressable>,
                            ])}
                            textStyle={{ padding: 5 }}
                        />
                    </Table>

                    <Pressable
                        onPress={() => setShowCreate(true)}
                        className="bg-purple-700 rounded-lg px-3 py-2 active:bg-purple-800"
                    >
                        <Text className="mx-0.5 text-lg font-bold text-center text-white">
                            + Agregar Producto
                        </Text>
                    </Pressable>

                    <View className="flex-row items-center justify-between w-full bg-white p-3 rounded-lg border border-gray-200">
                        <Text className="m-0.5">
                            {`Mostrando ${(page - 1) * 5} - ${
                                (page - 1) * 5 + products.length
                            } de ${countProducts}`}
                        </Text>
                        <View className="flex-row justify-center gap-2">
                            <Pressable
                                onPress={() => setPage(page - 1)}
                                disabled={page <= 1}
                                className="bg-gray-300 rounded-lg px-3 py-2 active:bg-gray-500 disabled:opacity-50"
                            >
                                <Text className="mx-0.5">Prev</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setPage(page + 1)}
                                disabled={page == Math.ceil(products.length / 5)}
                                className="bg-gray-300 rounded-lg px-3 py-2 active:bg-gray-500 disabled:opacity-50"
                            >
                                <Text className="mx-0.5">Next</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

            <Modal visible={showCreate} animationType="slide" transparent>
                <View className="flex-1 bg-black/40">
                    <View className="bg-white h-full mt-[300px] rounded-t-[20px]">
                        <View className="p-5">
                            <View className="flex-row items-center justify-between">
                                <Text className="text-2xl font-bold">Crear Producto</Text>
                                <Pressable
                                    onPress={() => setShowCreate(false)}
                                    className="border p-1 rounded-[10px] size-[35px] items-center justify-center active:bg-gray-300"
                                >
                                    <XIcon size={20} />
                                </Pressable>
                            </View>
                            <Formik>{({ handleSubmit, values }) => <View></View>}</Formik>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
