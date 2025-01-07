import React, { useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import { AntDesign } from "@expo/vector-icons";

// Hooks
import { useDeleteData, usePutData } from "../hooks/useFetchData";
import { useValidateForm } from "../hooks/useValidateForm";

// Components
import { DotsIcon, PencilIcon, ReportIcon, TrashIcon, XIcon } from "./icons";
import Stars from "./stars";

export default function Rating({ rating, reload, type }) {
    const [showOptions, setShowOptions] = useState(false);
    const [showEditRating, setShowEditRating] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleDeleteRating = async () => {
        const response = await useDeleteData(`/ratings/${rating.rating_id}`);

        if (response.success) {
            setShowOptions(false);
            reload();
        }
    };

    const handleSubmitEdit = async (values) => {
        console.log(values);

        const validation = useValidateForm(values, "rate-form");

        setErrors(validation.errors || []);

        if (validation.success) {
            console.log(values);
        }
    };

    return (
        <>
            <View className="gap-2">
                <View className="flex-row justify-between items-center">
                    <View className="flex-row gap-2 items-center">
                        <Image
                            source={{ uri: rating.calificator.user_image_url }}
                            style={{ width: 45, height: 45, objectFit: "cover" }}
                            className="rounded-full"
                        />
                        <View>
                            <Text className="text-xl font-bold">
                                {rating.calificator.user_alias}
                            </Text>
                            <Text className="leading-none">
                                {new Date(rating.rating_date).toLocaleDateString("es-CO")}
                            </Text>
                        </View>
                    </View>
                    <Pressable
                        onPress={() => setShowOptions(true)}
                        className="active:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                        <DotsIcon />
                    </Pressable>
                </View>
                <Stars value={rating.rating_value} />
                <Text>{rating.rating_comment}</Text>
                {rating?.rating_image_url && (
                    <Image
                        source={{ uri: rating.rating_image_url }}
                        style={{ width: 200, height: 200, objectFit: "contain" }}
                    />
                )}
            </View>

            <Modal visible={showOptions} animationType="slide" transparent>
                <View className="flex-1 bg-white mt-[60vh] rounded-t-[20px] border border-gray-300">
                    <View className="p-5 flex-1 gap-8">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-3xl font-bold tracking-tight mx-0.5">
                                Opciones comentario:
                            </Text>
                            <Pressable
                                onPress={() => setShowOptions(false)}
                                className="active:bg-gray-300 w-9 h-9 rounded-full flex items-center justify-center"
                            >
                                <XIcon size={25} />
                            </Pressable>
                        </View>
                        <View className="gap-2">
                            <Pressable
                                onPress={() => {
                                    setShowOptions(false);
                                    setTimeout(() => {
                                        alert("Comentario reportado");
                                    }, 500);
                                }}
                                className="w-full gap-5 p-5 flex-row items-center rounded-lg bg-gray-100"
                            >
                                <Text className="text-lg text-red-500 font-bold mx-0.5">
                                    <ReportIcon size={18} />
                                </Text>
                                <Text className="text-lg text-red-500 font-bold">
                                    Reportar comentario
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setShowOptions(false);
                                    setShowEditRating(true);
                                }}
                                className="w-full gap-5 p-5 flex-row items-center rounded-lg bg-gray-100"
                            >
                                <Text className="text-lg text-purple-700 font-bold mx-0.5">
                                    <PencilIcon size={18} />
                                </Text>
                                <Text className="text-lg text-purple-700 font-bold">
                                    Editar comentario
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={handleDeleteRating}
                                className="w-full gap-5 p-5 flex-row items-center rounded-lg bg-gray-100"
                            >
                                <Text className="text-lg text-red-500 font-bold mx-0.5">
                                    <TrashIcon size={18} />
                                </Text>
                                <Text className="text-lg text-red-500 font-bold">
                                    Eliminar comentario
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal visible={showEditRating} animationType="slide" transparent>
                <ScrollView className="flex-1 mt-[55vh] w-full bg-white rounded-t-[30px] border border-gray-400">
                    <View className="gap-5 px-5 pt-10 pb-[50px]">
                        <View className="flex-row justify-between items-center pr-5">
                            <Text className="text-3xl font-extrabold">
                                Calificar {type === "product" ? "producto" : "usuario"}
                            </Text>
                            <Pressable
                                onPress={() => setShowEditRating(false)}
                                className="active:bg-gray-300 w-9 h-9 rounded-full flex items-center justify-center"
                            >
                                <XIcon size={25} />
                            </Pressable>
                        </View>
                        <Formik initialValues={{ rating_value: rating.rating_value, rating_comment: rating.rating_comment }} onSubmit={handleSubmitEdit}>
                            {({
                                handleChange,
                                handleSubmit,
                                setFieldValue,
                                values,
                            }) => (
                                <View className="gap-5">
                                    <View>
                                        <Text className="text-lg leading-tight">
                                            {type === "product"
                                                ? `Ten en cuenta la calidad del producto y su fidelidad con la imagen y descripción.`
                                                : `Ten en cuenta como es su comportamiento y calidad de servicio.`}
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
                                            {errors.find(
                                                (error) => error.field === "rating_value"
                                            ) && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) =>
                                                                error.field === "rating_value"
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
        </>
    );
}
