import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
    Image,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";

// Hooks
import { useDeleteData, usePaginateData, usePostData } from "../../../hooks/useFetchData";
import { useValidateForm } from "../../../hooks/useValidateForm";
import { usePickImage } from "../../../hooks/usePickImage";

// Contexts
import { useAuthContext } from "../../../contexts/authContext";

// Components
import { PencilIcon, TrashIcon, XIcon } from "../../../components/icons";

export default function WorkerProducts() {
    const { userSession } = useAuthContext();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [showCreate, setShowCreate] = useState(false);
    const [errors, setErrors] = useState([]);

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

    const handleCreateProduct = async (values) => {
        const validation = useValidateForm(values, "create-product-form");
        setErrors(validation.errors || []);

        if (!values.product_image) {
            return alert("Debes subir una imagen");
        }

        if (validation.success) {
            const data = {
                product: {
                    product_name: values.product_name,
                    product_description: values.product_description,
                    product_price: values.product_price,
                    product_quantity: values.product_quantity,
                    product_status: values.product_status,
                    category_id: values.category_id,
                },
                product_image: values.product_image,
            };

            const response = await usePostData(`/products`, data);

            if (response.success) {
                setShowCreate(false);
                reloadProducts();
            }
        }
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
                                <Link asChild href={`/worker/products/${product.product_id}`}>
                                    <Pressable className="bg-purple-700 px-2 py-2 rounded-md w-10 m-auto active:bg-purple-800">
                                        <PencilIcon size={18} color="#fff" />
                                    </Pressable>
                                </Link>,
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
                    <ScrollView className="bg-white h-full mt-[300px] rounded-t-[20px]">
                        <View className="p-5 gap-8">
                            <View className="flex-row items-center justify-between">
                                <Text className="text-2xl font-bold">Crear Producto</Text>
                                <Pressable
                                    onPress={() => setShowCreate(false)}
                                    className="border p-1 rounded-[10px] size-[35px] items-center justify-center active:bg-gray-300"
                                >
                                    <XIcon size={20} />
                                </Pressable>
                            </View>

                            <Formik
                                initialValues={{
                                    product_name: "",
                                    product_description: "",
                                    product_price: 0,
                                    product_quantity: 0,
                                    product_status: "privado",
                                    product_image: null,
                                    category_id: "4",
                                }}
                                onSubmit={handleCreateProduct}
                            >
                                {({ handleSubmit, handleChange, setFieldValue, values }) => (
                                    <View className="gap-3">
                                        <View className="gap-1">
                                            <Text className="text-lg font-semibold">Nombre:</Text>
                                            <TextInput
                                                placeholder="Ingresa el nombre del producto"
                                                className="w-full bg-white border px-3 py-1 rounded text-lg"
                                                value={values.product_name}
                                                onChangeText={handleChange("product_name")}
                                            />
                                            {errors.find(
                                                (error) => error.field === "product_name"
                                            ) && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) =>
                                                                error.field === "product_name"
                                                        ).message
                                                    }
                                                </Text>
                                            )}
                                        </View>

                                        <View className="gap-1">
                                            <Text className="text-lg font-semibold">
                                                Descripcion:
                                            </Text>
                                            <TextInput
                                                placeholder="Ingresa el nombre del producto"
                                                className="w-full bg-white border px-3 py-1 rounded text-lg h-[100px]"
                                                value={values.product_description}
                                                onChangeText={handleChange("product_description")}
                                                multiline
                                                numberOfLines={5}
                                                textAlignVertical="top"
                                            />
                                            {errors.find(
                                                (error) => error.field === "product_description"
                                            ) && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) =>
                                                                error.field ===
                                                                "product_description"
                                                        ).message
                                                    }
                                                </Text>
                                            )}
                                        </View>

                                        <View className="gap-1">
                                            <Text className="text-lg font-semibold">Precio:</Text>
                                            <TextInput
                                                placeholder="Ingresa el precio del producto"
                                                className="w-full bg-white border px-3 py-1 rounded text-lg"
                                                value={values.product_price}
                                                onChangeText={handleChange("product_price")}
                                                keyboardType="decimal-pad"
                                            />
                                            {errors.find(
                                                (error) => error.field === "product_price"
                                            ) && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) =>
                                                                error.field === "product_price"
                                                        ).message
                                                    }
                                                </Text>
                                            )}
                                        </View>

                                        <View className="gap-1">
                                            <Text className="text-lg font-semibold">Cantidad:</Text>
                                            <TextInput
                                                placeholder="Ingresa la cantidad del producto"
                                                className="w-full bg-white border px-3 py-1 rounded text-lg"
                                                value={values.product_quantity}
                                                onChangeText={handleChange("product_quantity")}
                                                keyboardType="decimal-pad"
                                            />
                                            {errors.find(
                                                (error) => error.field === "product_quantity"
                                            ) && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) =>
                                                                error.field === "product_quantity"
                                                        ).message
                                                    }
                                                </Text>
                                            )}
                                        </View>

                                        <View className="gap-1">
                                            <Text className="text-lg font-semibold">
                                                Categoria:
                                            </Text>
                                            <View className="border border-gray-600 rounded">
                                                <Picker
                                                    selectedValue={values.category_id}
                                                    onValueChange={handleChange("category_id")}
                                                >
                                                    <Picker.Item label="Moda" value="1" />
                                                    <Picker.Item label="Comida" value="2" />
                                                    <Picker.Item label="Tecnologia" value="3" />
                                                    <Picker.Item label="Otros" value="4" />
                                                </Picker>
                                            </View>
                                            {errors.find(
                                                (error) => error.field === "category_id"
                                            ) && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) => error.field === "category_id"
                                                        ).message
                                                    }
                                                </Text>
                                            )}
                                        </View>

                                        <View className="gap-1">
                                            <Text className="text-lg font-semibold">
                                                Visibilidad:
                                            </Text>
                                            <View className="border border-gray-600 rounded">
                                                <Picker
                                                    selectedValue={values.product_status}
                                                    onValueChange={handleChange("product_status")}
                                                >
                                                    <Picker.Item label="Publico" value="publico" />
                                                    <Picker.Item label="Privado" value="privado" />
                                                </Picker>
                                            </View>
                                            {errors.find(
                                                (error) => error.field === "product_status"
                                            ) && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) =>
                                                                error.field === "product_status"
                                                        ).message
                                                    }
                                                </Text>
                                            )}
                                        </View>

                                        <View className="gap-1">
                                            <Text className="text-lg font-semibold">Imagen:</Text>
                                            <Pressable
                                                onPress={() =>
                                                    usePickImage(setFieldValue, "product_image")
                                                }
                                                className="bg-gray-300 rounded-lg px-3 py-2 active:bg-gray-500"
                                            >
                                                <Text className="text-center">
                                                    Seleccionar Imagen
                                                </Text>
                                            </Pressable>
                                            {values.product_image && (
                                                <View className="pt-4">
                                                    <Text className="text-center font-bold leading-loose">
                                                        Imagen seleccionada:
                                                    </Text>
                                                    <Image
                                                        source={{ uri: values.product_image }}
                                                        style={{
                                                            width: 250,
                                                            height: 150,
                                                            alignSelf: "center",
                                                            objectFit: "contain",
                                                        }}
                                                        className="border bg-gray-300 rounded-lg"
                                                    />
                                                </View>
                                            )}
                                            {errors.find(
                                                (error) => error.field === "product_image"
                                            ) && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) =>
                                                                error.field === "product_image"
                                                        ).message
                                                    }
                                                </Text>
                                            )}
                                        </View>

                                        <View className="py-5">
                                            <Pressable
                                                onPress={handleSubmit}
                                                className="bg-purple-700 w-full px-3 py-2 rounded-md active:bg-purple-800"
                                            >
                                                <Text className="text-xl text-center font-semibold text-white">
                                                    Crear
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                )}
                            </Formik>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </>
    );
}
