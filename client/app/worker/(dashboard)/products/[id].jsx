import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    View,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";

// Hooks
import { useGetData } from "../../../../hooks/useFetchData";
import { useValidateForm } from "../../../../hooks/useValidateForm";
import { usePickImage } from "../../../../hooks/usePickImage";

export default function ProductProfile() {
    const { id } = useLocalSearchParams();
    const [errors, setErrors] = useState([]);

    const {
        data: product,
        loading: loadingProduct,
        reload: reloadProduct,
    } = useGetData(`/products/${id}`);

    const handleUpdate = async (values) => {
        const validation = useValidateForm(values, "update-product-form");
        setErrors(validation.errors || []);

        if (validation.success) {
            console.log(values);
        }
    };

    if (loadingProduct) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <>
            <Stack.Screen options={{ headerTitle: "Editar producto" }} />
            <ScrollView>
                <View className="w-full">
                    <View className="w-full p-5">
                        <Formik
                            initialValues={{
                                product_name: product.product_name,
                                product_description: product.product_description,
                                product_price: product.product_price,
                                product_quantity: parseInt(product.product_quantity).toString(),
                                product_status: product.product_status,
                                product_image: null,
                                category_id: parseInt(product.category_id).toString(),
                            }}
                            onSubmit={handleUpdate}
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
                                        {errors.find((error) => error.field === "product_name") && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "product_name"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>

                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Descripcion:</Text>
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
                                                            error.field === "product_description"
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
                                                        (error) => error.field === "product_price"
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
                                        <Text className="text-lg font-semibold">Categoria:</Text>
                                        <View className="border border-gray-600 rounded">
                                            <Picker
                                                selectedValue={values.category_id}
                                                onValueChange={handleChange("category_id")}
                                            >
                                                <Picker.Item label="Moda" value="1" />
                                                <Picker.Item label="Tecnologia" value="2" />
                                                <Picker.Item label="Comida" value="3" />
                                                <Picker.Item label="Otros" value="4" />
                                            </Picker>
                                        </View>
                                        {errors.find((error) => error.field === "category_id") && (
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
                                        <Text className="text-lg font-semibold">Visibilidad:</Text>
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
                                                        (error) => error.field === "product_status"
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
                                            <Text className="text-center">Seleccionar Imagen</Text>
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
                                                        (error) => error.field === "product_image"
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
                                                Actualizar
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
