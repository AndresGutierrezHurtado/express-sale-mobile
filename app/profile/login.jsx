import { Stack, router, Link } from "expo-router";
import {
    View,
    Text,
    Pressable,
    Image,
    TextInput,
    ScrollView,
} from "react-native";

// Components
import { Screen } from "../../components/layout/screen";
import { ChevronsLeftIcon } from "../../components/icons";

export default function Login() {
    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "rgb(0,0,0,0)",
                    },
                    headerShadowVisible: false,
                    headerTitle: "",
                    headerLeft: () => (
                        <Pressable
                            className="p-1.5 rounded border border-black"
                            children={() => (
                                <ChevronsLeftIcon color="black" size={20} />
                            )}
                            onPress={() => router.push("/profile")}
                        />
                    ),
                }}
            />
            <ScrollView className="bg-gray-200 space-y-5">
                {/* Header */}
                <View className="flex items-center justify-center w-full py-5">
                    <Link asChild href="/">
                        <Image
                            source={require("../../public/logo.png")}
                            resizeMode="contain"
                            className="w-[150px] h-[120px]"
                        />
                    </Link>
                    <Text className="text-3xl font-extrabold ">
                        Express Sale
                    </Text>
                    <Text>
                        ¿No tienes cuenta aún?{" "}
                        <Link
                            href="/profile/register"
                            className="text-violet-600 font-bold"
                        >
                            Regístrate
                        </Link>
                    </Text>
                </View>

                {/* Log in container */}
                <View className="bg-white rounded-t-3xl mt-auto h-full p-5 w-full">
                    <View className="py-4">
                        <Text className="text-center font-bold text-3xl">
                            Inicia sesión
                        </Text>
                        <Text className="text-center">
                            Ingresa a tu cuenta para poder acceder a todas las
                            funcionalidades de la aplicación
                        </Text>
                    </View>
                    {/* Log in Form */}
                    <View className="space-y-4">
                        <View className="space-y-1">
                            <Text className="text-sm font-bold">
                                Correo electrónico{" "}
                                <Text className="text-red-500">*</Text>
                            </Text>
                            <TextInput
                                className="border border-gray-400 rounded px-4 py-1"
                                placeholder="ejemplo@gmail.com"
                            />
                        </View>
                        <View className="space-y-1">
                            <Text className="text-sm font-bold">
                                Contraseña{" "}
                                <Text className="text-red-500">*</Text>
                            </Text>
                            <TextInput
                                className="border border-gray-400 rounded px-4 py-1"
                                placeholder="********"
                            />
                        </View>
                        <View className="pt-2 space-y-5">
                            <Pressable className="w-full px-5 py-2 bg-violet-600 rounded-lg">
                                <Text className="text-lg text-white font-bold text-center">
                                    Inicia sesión
                                </Text>
                            </Pressable>
                            <View className="w-full h-[1px] border border-gray-500 relative">
                                <Text className="absolute bg-white left-1/2 -translate-x-[30px] top-[-16px] text-lg px-5 text-gray-500">
                                    ó
                                </Text>
                            </View>
                            <Pressable className="w-full px-5 py-2 bg-gray-200 rounded-lg">
                                <Text className="text-lg text-gray-500 font-bold text-center">
                                    Continua con Google
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
}
