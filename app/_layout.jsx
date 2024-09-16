import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
    return (
        <View className="flex-1">
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </View>
    );
}
