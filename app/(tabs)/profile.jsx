import { Text, View } from "react-native";

// Components
import { Screen } from "../../components/layout/screen";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    return (
        <SafeAreaView className="flex-1">
            <Screen>
                <Stack.Screen options={{ headerShown: false }} />
                <Text>Perfil</Text>
            </Screen>
        </SafeAreaView>
    );
}
