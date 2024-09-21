import { Link } from "expo-router";
import { Linking, Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";

// Components
import { Screen } from "../../components/layout/screen";

// Services
import { fetchData } from "../../services/fetchData";

export default function Products() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData("/api/products")
            .then((data) => setData(data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Screen>
            <View className="p-[20px] flex flex-row justify-between w-full">
                <Text>Productos</Text>
                <Pressable>
                    <Text>
                        Ordenar por
                    </Text>
                </Pressable>
            </View>
            <View className="p-[20px] flex flex-col gap-3">
                {loading ? (
                    <Text>Cargando...</Text>
                ) : (
                    data.map((product) => (
                        <Link
                            key={product.producto_id}
                            href={`products/${product.producto_id}`}
                        >
                            <Text>{product.producto_nombre}</Text>
                        </Link>
                    ))
                )}
            </View>
        </Screen>
    );
}
