import react, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { View, Modal, Text, Pressable, Image, ActivityIndicator, TextInput } from "react-native";
import { Formik } from "formik";

// Contexts
import { useAuthContext } from "../../contexts/authContext.jsx";

// Hooks
import { useGetData } from "../../hooks/useFetchData.js";

// Components
import GuestProfile from "../../components/guestProfile.jsx";

export default function Profile() {
    const { id } = useLocalSearchParams();
    const { userSession, reloadUserSession, handleLogout } = useAuthContext();
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [errors, setErrors] = useState([]);

    if (!userSession) {
        return <GuestProfile />;
    }

    const {
        data: user,
        reload: reloadUser,
        loading: loadingUser,
    } = useGetData(`/users/${id || userSession.user_id}`);

    if (id && id !== userSession.user_id && userSession.role_id != 4) router.replace("/");

    if (loadingUser) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <>
            <View className="w-full">
                <View className="w-full px-5 py-10 gap-5 items-center">
                    <View className="w-full items-center gap-3">
                        <Image
                            source={{ uri: user.user_image_url }}
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
                    <View className="w-full flex-row gap-4 justify-center items-center">
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
                        {user.worker && (
                            <Pressable className="px-3 py-1 bg-purple-700 rounded-lg">
                                <Text className="text-lg text-purple-100 font-semibold text-center">
                                    Calificar
                                </Text>
                            </Pressable>
                        )}
                    </View>
                    <Text>{user.worker.worker_description}</Text>
                </View>
            </View>
            <Modal visible={showEditUserModal} animationType="slide" transparent>
                <View className="flex-1"></View>
                <View className="w-full h-fit bg-white p-5 pt-12 pb-[100px] rounded-t-[30px] border border-gray-400 gap-10">
                    <View className="flex-row justify-between items-center pt-5 pr-5">
                        <Text className="text-3xl font-extrabold">Editar perfil</Text>
                        <Pressable
                            className="bg-gray-300 w-fit p-3 py-2 rounded-full active:bg-gray-200 z-50"
                            onPress={() => setShowEditUserModal(false)}
                        >
                            <Text className="text-gray-800 text-center">X</Text>
                        </Pressable>
                    </View>
                    <Formik initialValues={user} onSubmit={(values) => console.log(values)}>
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
                                                errors.find((error) => error.field === "user_name")
                                                    .message
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
                                    {errors.find((error) => error.field === "user_lastname") && (
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
                                                errors.find((error) => error.field === "user_alias")
                                                    .message
                                            }
                                        </Text>
                                    )}
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
                                    {errors.find((error) => error.field === "user_email") && (
                                        <Text className="text-red-600">
                                            {
                                                errors.find((error) => error.field === "user_email")
                                                    .message
                                            }
                                        </Text>
                                    )}
                                </View>
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
                                        <Text className="text-white text-center">Actualizar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </Modal>
        </>
    );
}
