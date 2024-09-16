import { Link } from "expo-router";
import { Text, View } from "react-native";

// Components
import { Screen } from "../../components/layout/screen";

export default function Products() {
    return (
        <Screen>
            <Text>Productos</Text>
            <Link href="/products/1">producto 1</Link>
            <Link href="/products/2">producto 2</Link>
            <Link href="/products/3">producto 3</Link>
        </Screen>
    );
}
