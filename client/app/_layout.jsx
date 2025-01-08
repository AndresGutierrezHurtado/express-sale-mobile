import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Stack } from "expo-router";

import "../global.css";
import AuthContextProvider from "../contexts/authContext";

export default function RootLayout() {
    return (
        <AuthContextProvider>
            <SafeAreaView className="flex-1 bg-white">
                <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="worker/(dashboard)" options={{ headerShown: false }} />
                </Stack>
            </SafeAreaView>
        </AuthContextProvider>
    );
}
