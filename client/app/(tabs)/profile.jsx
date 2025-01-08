import React, { useState } from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import {
    View,
    Modal,
    Text,
    Pressable,
    Image,
    ActivityIndicator,
    TextInput,
    ScrollView,
} from "react-native";
import { Formik } from "formik";

// Contexts
import { useAuthContext } from "../../contexts/authContext.jsx";

// Hooks
import { useGetData, usePutData } from "../../hooks/useFetchData.js";
import { useValidateForm } from "../../hooks/useValidateForm.js";

// Components
import GuestProfile from "../../components/guestProfile.jsx";
import { XIcon } from "../../components/icons.jsx";

// Middlewares
import { useRouteMiddleware } from "../../middlewares/useRouteMiddleware.js";

export default function Profile() {
    const { id } = useLocalSearchParams();
    const { userSession, handleLogout } = useAuthContext();

    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [errors, setErrors] = useState([]);

    useRouteMiddleware(
        [id && !userSession, id && id !== userSession?.user_id && userSession?.role_id != 4],
        "Acceso denegado"
    );

    const {
        data: user,
        reload: reloadUser,
        loading: loadingUser,
    } = useGetData(`/users/${id || userSession?.user_id}`);

    if (loadingUser) return <ActivityIndicator size="large" color="#0000ff" />;

    if (!user || !userSession) {
        return <GuestProfile />;
    }

    const handleSubmitEdit = async (values) => {
        const data = {
            user: {
                user_name: values.user_name,
                user_lastname: values.user_lastname,
                user_alias: values.user_alias,
                user_address: values.user_address,
                user_phone: values.user_phone,
                role_id: values.role_id,
            },
        };

        if (user.worker) {
            data.worker = {
                worker_description: values.worker.worker_description,
            };
        }

        const validation = useValidateForm({ ...data.user, ...data.worker }, "user-edit-form");
        setErrors(validation.errors || []);

        if (validation.success) {
            const response = await usePutData(`/users/${user.user_id}`, data);

            if (response.success) {
                setShowEditUserModal(false);
                reloadUser();
            }
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: `Perfil de ${user.user_name}` }} />
            <View className="w-full">
                <View className="w-full px-5 py-10 gap-5 items-center">
                    <View className="w-full items-center gap-3">
                        <Image
                            source={{
                                uri:
                                    user.user_image_url == "/images/default.jpg"
                                        ? process.env.EXPO_PUBLIC_APP_DOMAIN + user.user_image_url
                                        : user.user_image_url,
                            }}
                            className="w-20 h-20 rounded-full"
                            style={{ width: 120, height: 120, objectFit: "cover" }}
                        />
                        <View>
                            <Text className="text-2xl font-semibold text-center">
                                @{user.user_alias}
                            </Text>
                            <Text className="text-lg text-gray-500 font-medium text-center">
                                {user.role.role_name}
                            </Text>
                        </View>
                    </View>
                    <View className="w-full flex-row flex-wrap gap-4 justify-center items-center">
                        {(user.user_id === userSession.user_id || userSession.role_id == 4) && (
                            <Pressable
                                onPress={() => setShowEditUserModal(true)}
                                className="px-3 py-1 bg-gray-200 rounded-lg"
                            >
                                <Text className="text-lg text-gray-600 font-semibold">
                                    Editar Perfil
                                </Text>
                            </Pressable>
                        )}
                        {(user.role_id == 2 || user.role_id == 3) && (
                            <Link asChild href={`/worker/${user.user_id}`}>
                                <Pressable className="px-3 py-1 bg-gray-200 rounded-lg">
                                    <Text className="text-lg text-gray-600 font-semibold">
                                        Ver Perfil
                                    </Text>
                                </Pressable>
                            </Link>
                        )}
                        {user.user_id === userSession.user_id && (
                            <Pressable
                                className="px-3 py-1 bg-red-600 rounded-lg"
                                onPress={async () => await handleLogout()}
                            >
                                <Text className="text-lg text-red-100 font-semibold">
                                    Cerrar Sesión
                                </Text>
                            </Pressable>
                        )}
                    </View>
                    <View className="w-full flex-row flex-wrap gap-4 justify-center items-center">
                        {userSession.role_id == 4 && (
                            <>
                                <Link asChild href={`/admin/users`}>
                                    <Pressable className="px-3 py-1 bg-gray-200 rounded-lg">
                                        <Text className="text-lg text-gray-600 font-semibold">
                                            Administrar usuarios
                                        </Text>
                                    </Pressable>
                                </Link>
                                <Link asChild href={`/admin/products`}>
                                    <Pressable className="px-3 py-1 bg-gray-200 rounded-lg">
                                        <Text className="text-lg text-gray-600 font-semibold">
                                            Administrar usuarios
                                        </Text>
                                    </Pressable>
                                </Link>
                            </>
                        )}
                    </View>
                    {user.worker && <Text>{user.worker.worker_description}</Text>}
                </View>
            </View>
            <Modal visible={showEditUserModal} animationType="slide" transparent>
                <View className="flex-1"></View>
                <ScrollView className="w-full h-[70%] bg-white rounded-t-[30px] border border-gray-400">
                    <View className="gap-10 px-5 pt-10 pb-[50px]">
                        <View className="flex-row justify-between items-center pt-5 pr-5">
                            <Text className="text-3xl font-extrabold">Editar perfil</Text>
                            <Pressable
                                onPress={() => setShowEditUserModal(false)}
                                className="active:bg-gray-300 w-9 h-9 rounded-full flex items-center justify-center"
                            >
                                <XIcon size={25} />
                            </Pressable>
                        </View>
                        <Formik initialValues={user} onSubmit={handleSubmitEdit}>
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View className="gap-3">
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Nombre: </Text>
                                        <TextInput
                                            placeholder="Ingresa tu nombre"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.user_name}
                                            onChangeText={handleChange("user_name")}
                                        />
                                        {errors.find((error) => error.field === "user_name") && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "user_name"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Apellidos: </Text>
                                        <TextInput
                                            placeholder="Ingresa tu apellidos"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.user_lastname}
                                            onChangeText={handleChange("user_lastname")}
                                        />
                                        {errors.find(
                                            (error) => error.field === "user_lastname"
                                        ) && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "user_lastname"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Usuario: </Text>
                                        <TextInput
                                            placeholder="Ingresa tu usuario"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.user_alias}
                                            onChangeText={handleChange("user_alias")}
                                        />
                                        {errors.find((error) => error.field === "user_alias") && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "user_alias"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Teléfono: </Text>
                                        <TextInput
                                            placeholder="Ingresa tu numero de telefono"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.user_phone}
                                            onChangeText={handleChange("user_phone")}
                                        />
                                        {errors.find((error) => error.field === "user_phone") && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "user_phone"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Dirección: </Text>
                                        <TextInput
                                            placeholder="Ingresa la dirección de tu hogar/tienda"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.user_address}
                                            onChangeText={handleChange("user_address")}
                                        />
                                        {errors.find((error) => error.field === "user_address") && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "user_address"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>
                                    {user.worker && (
                                        <View className="gap-1">
                                            <Text className="text-lg font-semibold">
                                                Descripción:{" "}
                                            </Text>
                                            <TextInput
                                                placeholder="Ingresa una descripcion para tu perfil de trabajador"
                                                className="w-full bg-white border px-3 py-1 rounded text-lg h-32"
                                                value={values.worker.worker_description}
                                                onChangeText={handleChange(
                                                    "worker.worker_description"
                                                )}
                                                multiline
                                            />
                                            {errors.find(
                                                (error) => error.field === "worker_description"
                                            ) && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) =>
                                                                error.field === "worker_description"
                                                        ).message
                                                    }
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                    {user.user_id !== userSession.user_id && (
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
                                            {errors.find((error) => error.field === "role_id") && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) => error.field === "role_id"
                                                        ).message
                                                    }
                                                </Text>
                                            )}
                                        </View>
                                    )}

                                    <View className="gap-1 pt-5">
                                        <Pressable
                                            className="bg-purple-700 w-full p-3 py-2 rounded-lg active:bg-purple-600 z-50"
                                            onPress={handleSubmit}
                                        >
                                            <Text className="text-white text-center">
                                                Actualizar
                                            </Text>
                                        </Pressable>
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
