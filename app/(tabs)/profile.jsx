import { Text, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import { Screen } from "../../components/layout/screen";

export default function Profile() {
    return (
        <SafeAreaView className="flex-1">
            <Screen>
                <Stack.Screen options={{ headerShown: false }} />
                <Text>Perfil</Text>
                <Link asChild href="/profile/login">
                    <Text>
                        Iniciar Sesión
                    </Text>
                </Link>
                <Link asChild href="/profile/login">
                    <Text>
                        Crea tu cuenta
                    </Text>
                </Link>
            </Screen>
        </SafeAreaView>
    );
}
