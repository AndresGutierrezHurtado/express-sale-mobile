import { Stack, router } from "expo-router";
import { View, Text, Pressable } from "react-native";

// Components
import { Screen } from "../../components/layout/screen";
import { ChevronsLeftIcon } from "../../components/icons";

export default function Login() {
    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "white" },
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
            <Text>Login</Text>
        </Screen>
    );
}
