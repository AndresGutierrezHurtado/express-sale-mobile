import React, { useState } from "react";
import { router } from "expo-router";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import { AntDesign } from "@expo/vector-icons";

// Hooks
import { usePostData } from "../hooks/useFetchData";
import { useValidateForm } from "../hooks/useValidateForm";

// Contexts
import { useAuthContext } from "../contexts/authContext";

export default function RateModal({ isModalOpen, setModalOpen, reload, id, type }) {
    const { userSession } = useAuthContext();

    const [errors, setErrors] = useState([]);
    const [rating, setRating] = useState(0);

    const handleSubmit = async (values) => {
        if (!userSession) {
            setModalOpen(false);
            alert("Para calificar debes iniciar sesión");
            return router.push("/login");
        }
        const validation = useValidateForm(values, "rate-form");
        setErrors(validation.errors || []);
        console.log(validation.errors);

        if (validation.success) {
        //     const response = await usePostData(`/ratings/${type}s/${id}`, values);

        //     if (response.success) {
        //         setModalOpen(false);
        //         reload();
        //     }
        }
    };

    return (
        <Modal visible={isModalOpen} animationType="slide" transparent>
            <View className="flex-1"></View>
            <ScrollView className="w-full h-[0px] bg-white rounded-t-[30px] border border-gray-400">
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
                        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                            <View className="gap-5">
                                <View>
                                    <Text className="text-lg leading-tight">
                                        Ten en cuenta la calidad del producto y su fidelidad con la
                                        imagen y descripción.
                                    </Text>
                                </View>
                                <View className="gap-3">
                                    <Text className="text-2xl font-extrabold">
                                        Deja tu calificación:
                                    </Text>
                                    <View className="gap-1">
                                        <View className="flex-row items-center justify-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Pressable
                                                    key={star}
                                                    onPress={() =>
                                                        setFieldValue("rating_value", star)
                                                    }
                                                >
                                                    <AntDesign
                                                        name={
                                                            star <= values.rating_value
                                                                ? "star"
                                                                : "staro"
                                                        }
                                                        size={32}
                                                        color="#7E22CE"
                                                        className="mx-1"
                                                    />
                                                </Pressable>
                                            ))}
                                        </View>
                                        {errors.find((error) => error.field === "rating_value") && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "rating_value"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>
                                    <View className="flex-row gap-4 justify-between items-center">
                                        <View className="gap-1 grow w-8/12">
                                            <TextInput
                                                placeholder={`Ingresa tu comentario a cerca del ${
                                                    type === "product" ? "producto" : "usuario"
                                                }`}
                                                className="bg-white border border-gray-400 rounded-lg px-3 py-2 text-lg h-[50px]"
                                                multiLine
                                                numberOfLines={4}
                                                value={values.rating_comment}
                                                onChangeText={handleChange("rating_comment")}
                                            />
                                            {errors.find(
                                                (error) => error.field === "rating_comment"
                                            ) && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) =>
                                                                error.field === "rating_comment"
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
