import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Pressable, Image } from "react-native";
import { Link, Stack } from "expo-router";
import { styled } from "nativewind";

// Components
import { Screen } from "../../components/layout/screen";
import { UserPlusIcon, LogInIcon } from "../../components/icons";

export default function Profile() {

    const StyledPressable = styled(Pressable);

    return (
        <SafeAreaView className="flex-1">
            <Screen>
                <Stack.Screen options={{ headerShown: false }} />
                <View className="w-full bg-gray-100 p-2">
                    <Text className="font-bold text-xl">Perfil</Text>
                </View>
                <View className="flex flex-col gap-4 p-5 items-center justify-center">
                    <Text className="text-2xl text-center font-medium">No has iniciado sesión aún...</Text>
                    <View className="flex flex-col gap-2">
                        <Link asChild href="/profile/login">
                            <StyledPressable className="px-8 py-2 bg-violet-600 rounded-lg active:bg-violet-300 duration-300">
                                <Text className="text-white font-bold text-lg text-center">Iniciar Sesión</Text>
                            </StyledPressable>
                        </Link>
                        <Link asChild href="/profile/register">
                            <StyledPressable className="px-8 py-2 bg-gray-200 rounded-lg">
                                <Text className="text-gray-500 font-bold text-lg text-center">Crea tu cuenta</Text>
                            </StyledPressable>
                        </Link>
                    </View>
                </View>
            </Screen>
        </SafeAreaView>
    );
}
