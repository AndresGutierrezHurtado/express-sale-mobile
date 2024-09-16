import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

// Services
import { fetchData } from "../../services/fetchData";
import { useState, useEffect } from "react";

export default function Product() {
    const { id } = useLocalSearchParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData(`/api/products/${id}`)
            .then((data) => setProduct(data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View>
            <Stack.Screen
                options={{
                    title: product ? product.producto_nombre : "Cargando...",
                }}
            />
            {loading || !product ? (
                <Text>Cargando...</Text>
            ) : (
                <>
                    <Text className="text-xl font-extrabold tracking-tight">
                        {product ? product.producto_nombre : "Cargando..."}
                    </Text>
                    <Text className="text-gray-700">
                        {product ? product.producto_descripcion : "Cargando..."}
                    </Text>
                    <Text className="font-bold text-lg">
                        {product ? product.producto_precio + " COP" : "Cargando..."}
                    </Text>
                </>
            )}
        </View>
    );
}
