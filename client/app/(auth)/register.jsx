import React from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";

export default function Register() {
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
                            Si ya tienes cuenta,{" "}
                            <Link replace href="/login" className="text-purple-700 font-semibold">
                                inicia sesión
                            </Link>
                        </Text>
                    </View>
                </View>
                <Formik
                    initialValues={{
                        user_name: "",
                        user_lastname: "",
                        user_alias: "",
                        user_email: "",
                        user_password: "",
                        role_id: 1,
                    }}
                    onSubmit={(values) => console.log(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <ScrollView
                            className="h-fit w-full max-h-[500px] bg-white border border-gray-200 px-7 pt-12 gap-10"
                            style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
                        >
                            <View className="gap-2">
                                <Text className="text-3xl font-extrabold text-center capitalize">
                                    Regístrate
                                </Text>
                                <Text className="text-lg text-gray-600 leading-none text-center max-w-xs mx-auto">
                                    Crea una cuenta para ser parte de la comunidad.
                                </Text>
                            </View>
                            <View className="gap-3">
                                <View className="gap-1">
                                    <Text className="text-lg font-semibold">Nombre: </Text>
                                    <TextInput
                                        placeholder="Ingresa tu nombre"
                                        className="w-full bg-white border px-3 py-1 rounded text-lg"
                                        value={values.user_name}
                                        onChangeText={handleChange("user_name")}
                                    />
                                </View>
                                <View className="gap-1">
                                    <Text className="text-lg font-semibold">Apellidos: </Text>
                                    <TextInput
                                        placeholder="Ingresa tu apellidos"
                                        className="w-full bg-white border px-3 py-1 rounded text-lg"
                                        value={values.user_lastname}
                                        onChangeText={handleChange("user_lastname")}
                                    />
                                </View>
                                <View className="gap-1">
                                    <Text className="text-lg font-semibold">Usuario: </Text>
                                    <TextInput
                                        placeholder="Ingresa tu usuario"
                                        className="w-full bg-white border px-3 py-1 rounded text-lg"
                                        value={values.user_alias}
                                        onChangeText={handleChange("user_alias")}
                                    />
                                </View>
                                <View className="gap-1">
                                    <Text className="text-lg font-semibold">
                                        Correo electrónico:{" "}
                                    </Text>
                                    <TextInput
                                        placeholder="ejemplo@gmail.com"
                                        className="w-full bg-white border px-3 py-1 rounded text-lg"
                                        value={values.user_email}
                                        onChangeText={handleChange("user_email")}
                                    />
                                </View>
                                <View className="gap-1">
                                    <Text className="text-lg font-semibold">Contraseña: </Text>
                                    <TextInput
                                        placeholder="********"
                                        className="w-full bg-white border px-3 py-1 rounded text-lg"
                                        value={values.user_password}
                                        onChangeText={handleChange("user_password")}
                                    />
                                </View>
                                <View className="gap-1">
                                    <Text className="text-lg font-semibold">Rol: </Text>
                                    <View className="border rounded">
                                        <Picker
                                            style={{ height: 50 }}
                                            className="w-full bg-white border px-3 py-1 rounded"
                                            selectedValue={values.role_id}
                                            onValueChange={handleChange("role_id")}
                                        >
                                            <Picker.Item label="Usuario" value="1" />
                                            <Picker.Item label="Vendedor" value="2" />
                                            <Picker.Item label="Domiciliario" value="3" />
                                        </Picker>
                                    </View>
                                </View>
                                <Link
                                    href="/recover"
                                    className="text-lg text-purple-700 font-semibold text-right"
                                >
                                    Olvidaste tu contraseña?
                                </Link>

                                <View className="mb-20">
                                    <Pressable
                                        onPress={handleSubmit}
                                        className="w-full bg-purple-700 py-2 rounded"
                                    >
                                        <Text className="text-lg font-semibold text-center text-white">
                                            Registrarme
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </ScrollView>
                    )}
                </Formik>
            </View>
        </View>
    );
}
