import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Stack } from "expo-router";

import "../global.css";

export default function RootLayout() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaView>
    );
}
