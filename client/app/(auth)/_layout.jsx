import { router, Stack } from "expo-router";
import { Pressable, Text } from "react-native";
import { ChevronsLeft } from "../../components/icons";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitle: "",
                headerTransparent: true,
                headerShown: true,
                headerLeft: () => (
                    <Pressable
                        onPress={() => {
                            router.back();
                        }}
                        className="border p-1 rounded-[10px] size-[35px] items-center justify-center active:bg-gray-300"
                    >
                        <ChevronsLeft size={20} />
                    </Pressable>
                ),
            }}
        />
    );
}
