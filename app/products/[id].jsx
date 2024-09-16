import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Product() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Stack.Screen options={{ title: `Producto ${id}` }} />
            <Text>{id}</Text>
        </View>
    );
}