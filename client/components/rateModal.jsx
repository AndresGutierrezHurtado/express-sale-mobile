import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Formik } from "formik";

// Hooks
import { usePostData } from "../hooks/useFetchData";
import { useValidateForm } from "../hooks/useValidateForm";

export default function RateModal({ isModalOpen, setModalOpen, reload, id, type }) {
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (values) => {
        const validation = useValidateForm(values, "rate-form");
        setErrors(validation.errors || []);

        if (validation.success) {
            const response = await usePostData(`/ratings/${type}s/${id}`, values);

            if (response.success) {
                setModalOpen(false);
                reload();
            }
        }
    };

    return (
        <Modal visible={isModalOpen} animationType="slide" transparent>
            <View className="flex-1"></View>
            <ScrollView className="w-full h-[15%] bg-white rounded-t-[30px] border border-gray-400">
                <View className="gap-5 px-5 pt-10 pb-[50px]">
                    <View className="flex-row justify-between items-center pr-5">
                        <Text className="text-3xl font-extrabold">
                            Calificar {type === "product" ? "producto" : "usuario"}
                        </Text>
                        <Pressable
                            className="bg-gray-300 w-fit p-3 py-2 rounded-full active:bg-gray-200 z-50"
                            onPress={() => setModalOpen(false)}
                        >
                            <Text className="text-gray-800 text-center">X</Text>
                        </Pressable>
                    </View>
                    <Formik
                        initialValues={{ rating_value: 0, rating_comment: "" }}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View className="gap-5">
                                <View>
                                    <Text className="text-lg leading-tight">
                                        Ten en cuenta la calidad del producto y su fidelidad con la
                                        imagen y descripción.
                                    </Text>
                                </View>
                                <View className="gap-3">
                                    <View className="flex-row gap-4 justify-between items-center">
                                        <View className="gap-1 grow w-8/12">
                                            <Text className="text-lg font-semibold">
                                                Comentario:
                                            </Text>
                                            <TextInput
                                                placeholder={`Ingresa tu comentario a cerca del ${
                                                    type === "product" ? "producto" : "usuario"
                                                }`}
                                                className="bg-white border px-3 py-1 rounded text-lg h-32"
                                                multiLine
                                                value={values.rating_comment}
                                                onChangeText={handleChange("user_email")}
                                            />
                                            {errors.find(
                                                (error) => error.field === "user_email"
                                            ) && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) => error.field === "user_email"
                                                        ).message
                                                    }
                                                </Text>
                                            )}
                                        </View>
                                        <View className="grow">
                                            <Pressable
                                                onPress={handleSubmit}
                                                className="bg-purple-700 py-2 px-2 rounded"
                                            >
                                                <Text className="text-lg font-semibold text-center text-white">
                                                    Subir
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </Modal>
    );
}
