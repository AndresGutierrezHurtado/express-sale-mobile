import react, { useState } from "react";
import { View, Modal, Text, Pressable, Image } from "react-native";

// Contexts
import { useAuthContext } from "../../contexts/authContext.jsx";
import {
    AtIcon,
    FacebookIcon,
    GithubIcon,
    GoogleIcon,
    ProfileIcon,
} from "../../components/icons.jsx";
import { Link } from "expo-router";

export default function Profile() {
    const { userSession } = useAuthContext();
    const [showModal, setShowModal] = useState(false);

    if (!userSession) {
        return (
            <>
                <View className="flex-1 items-center justify-center px-3">
                    <ProfileIcon size={80} />
                    <Text className="text-xl text-gray-600 max-w-sm text-center leading-tight">
                        Autentícate para acceder a todas las funciones.
                    </Text>
                    <Pressable
                        className="mt-5 py-2 px-10 bg-purple-700 rounded-full"
                        onPress={() => setShowModal(true)}
                    >
                        <Text className="text-white text-lg disabled:opacity-50">
                            Iniciar sesión
                        </Text>
                    </Pressable>
                </View>
                <Modal animationType="slide" visible={showModal} transparent>
                    <View
                        className="flex-1 bg-white rounded-t-[20px] mt-[200px] shadow-xl"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowRadius: 10.32,
                            elevation: 30,
                        }}
                    >
                        <View className="items-end pt-5 pr-5">
                            <Pressable
                                className="bg-gray-300 w-fit p-3 py-2 rounded-full active:bg-gray-200 z-50"
                                onPress={() => setShowModal(false)}
                            >
                                <Text className="text-gray-800 text-center">X</Text>
                            </Pressable>
                        </View>
                        <View className="w-full p-5 gap-6 grow">
                            <View>
                                <Text className="text-2xl font-extrabold text-gray-800 text-center">
                                    Inicia sesión en Express Sale
                                </Text>
                                <Text className="text-lg disabled:opacity-50 max-w-sm text-center mx-auto">
                                    Gestiona tu cuenta, haz pedidos y mucho más.
                                </Text>
                            </View>

                            <View className="gap-2">
                                <Link asChild href="/login">
                                    <Pressable
                                        onPress={() => setShowModal(false)}
                                        className="flex-row w-full bg-gray-300 active:bg-gray-400 px-3 py-2 rounded-lg disabled:opacity-50"
                                    >
                                        <AtIcon size={20} className="ml-1" />
                                        <Text className="text-gray-800 text-center font-semibold grow">
                                            Iniciar sesión con Correo
                                        </Text>
                                    </Pressable>
                                </Link>
                                <Pressable
                                    disabled={true}
                                    className="flex-row w-full bg-gray-300 active:bg-gray-400 px-3 py-2 rounded-lg disabled:opacity-50"
                                >
                                    <GoogleIcon size={20} className="ml-1" />
                                    <Text className="text-gray-800 text-center font-semibold grow">
                                        Iniciar sesión con Google
                                    </Text>
                                </Pressable>

                                <Pressable
                                    disabled={true}
                                    className="flex-row w-full bg-gray-300 active:bg-gray-400 px-3 py-2 rounded-lg disabled:opacity-50"
                                >
                                    <FacebookIcon size={20} className="ml-1" />
                                    <Text className="text-gray-800 text-center font-semibold grow">
                                        Iniciar sesión con Facebook
                                    </Text>
                                </Pressable>

                                <Pressable
                                    disabled={true}
                                    className="flex-row w-full bg-gray-300 active:bg-gray-400 px-3 py-2 rounded-lg disabled:opacity-50"
                                >
                                    <GithubIcon size={20} className="ml-1" />
                                    <Text className="text-gray-800 text-center font-semibold grow">
                                        Iniciar sesión con GitHub
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <View className="w-full bg-gray-300 p-5 border-t border-gray-600">
                            <Text className="text-center text-lg disabled:opacity-50">
                                {"¿No tienes una cuenta?, "}
                                <Link
                                    href="/register"
                                    onPress={() => setShowModal(false)}
                                    className="text-purple-700 font-semibold"
                                >
                                    Regístrate
                                </Link>
                            </Text>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }

    return (
        <View className="w-full">
            <View className="w-full px-5 py-10 gap-5 items-center">
                <View className="w-full items-center gap-3">
                    <Image
                        source={{ uri: userSession.user_image_url }}
                        className="w-20 h-20 rounded-full"
                        style={{ width: 120, height: 120, objectFit: "cover" }}
                    />
                    <View>
                        <Text className="text-2xl font-semibold text-center">@{userSession.user_alias}</Text>
                        <Text className="text-lg text-gray-500 font-medium text-center">
                            {userSession.role.role_name}
                        </Text>
                    </View>
                </View>
                <View className="w-full flex-row gap-4 justify-center items-center">
                    <Pressable className="px-3 py-1 bg-gray-200 rounded-lg">
                        <Text className="text-lg text-gray-600 font-semibold">Editar Perfil</Text>
                    </Pressable>
                    {userSession.worker && (
                        <Pressable className="px-3 py-1 bg-purple-700 rounded-lg">
                            <Text className="text-lg text-purple-100 font-semibold text-center">
                                Calificar
                            </Text>
                        </Pressable>
                    )}
                </View>
                <Text>{userSession.worker.worker_description}</Text>
            </View>
        </View>
    );
}
