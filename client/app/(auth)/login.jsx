import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { Formik } from "formik";
import { useValidateForm } from "../../hooks/useValidateForm";

export default function Login() {
    const [errors, setErrors] = useState([]);

    return (
        <View className="flex-1 pt-[50px]">
            <View className="flex-1 items-center justify-center">
                <View className="grow items-center justify-center gap-3">
                    <Image
                        source={{ uri: `${process.env.EXPO_PUBLIC_APP_DOMAIN}/logo.png` }}
                        style={{ width: 140, height: 110, objectFit: "contain" }}
                    />
                    <View className="items-center justify-center">
                        <Text className="text-4xl font-extrabold tracking-tight">Express Sale</Text>
                        <Text className="text-lg leading-tight">
                            Si no tienes cuenta aún,{" "}
                            <Link
                                replace
                                href="/register"
                                className="text-purple-700 font-semibold"
                            >
                                regístrate
                            </Link>
                        </Text>
                    </View>
                </View>
                <Formik
                    initialValues={{
                        user_email: "",
                        user_password: "",
                    }}
                    onSubmit={(data) => {
                        const validation = useValidateForm(data, "login-form");
                        setErrors(validation.errors || []);

                        if (validation.success) {
                            console.log(data);
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View
                            className="h-fit w-full bg-white border border-gray-200 px-7 pt-12 pb-20 gap-10"
                            style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
                        >
                            <View className="gap-2">
                                <Text className="text-3xl font-extrabold text-center capitalize">
                                    Inicia sesión
                                </Text>
                                <Text className="text-lg text-gray-600 leading-none text-center max-w-xs mx-auto">
                                    Ingresa a tu cuenta para poder acceder a todas las funciones de
                                    la página
                                </Text>
                            </View>
                            <View className="gap-3">
                                <View className="gap-1">
                                    <Text className="text-lg font-semibold">
                                        Correo electrónico:
                                    </Text>
                                    <TextInput
                                        placeholder="ejemplo@gmail.com"
                                        className="w-full bg-white border px-3 py-1 rounded text-lg"
                                        value={values.user_email}
                                        onChangeText={handleChange("user_email")}
                                    />
                                    {errors.find((error) => error.field === "user_email") && (
                                        <Text className="text-red-600">
                                            {
                                                errors.find((error) => error.field === "user_email")
                                                    .message
                                            }
                                        </Text>
                                    )}
                                </View>
                                <View className="gap-1">
                                    <Text className="text-lg font-semibold">Contraseña: </Text>
                                    <TextInput
                                        placeholder="********"
                                        className="w-full bg-white border px-3 py-1 rounded text-lg"
                                        value={values.user_password}
                                        onChangeText={handleChange("user_password")}
                                    />
                                    {errors.find((error) => error.field === "user_password") && (
                                        <Text className="text-red-600">
                                            {
                                                errors.find(
                                                    (error) => error.field === "user_password"
                                                ).message
                                            }
                                        </Text>
                                    )}
                                </View>
                                <Link
                                    href="/recover"
                                    className="text-lg text-purple-700 font-semibold text-right"
                                >
                                    Olvidaste tu contraseña?
                                </Link>

                                <View className="gap-2">
                                    <Pressable
                                        onPress={handleSubmit}
                                        className="w-full bg-purple-700 py-2 rounded"
                                    >
                                        <Text className="text-lg font-semibold text-center text-white">
                                            Iniciar sesión
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
}
