import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View, Image } from "react-native";

// Components
import { Screen } from "../../components/layout/screen";
import { CartIcon } from "../../components/icons";

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
        <Screen>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "white" },
                    headerShadowVisible: false,
                    headerTitle: "",
                    headerRight: () => <CartIcon color="black" size={20} />,
                }}
            />
            {loading || !product ? (
                <Text>Cargando producto...</Text>
            ) : (
                <View className="p-[20px] flex flex-col gap-4">
                    <View>
                        <Image
                            source={{ uri: process.env.EXPO_PUBLIC_APP_URL + product.producto_imagen_url }}
                            className="w-full h-[200px] rounded-lg bg-gray-100"
                            resizeMode="contain"
                        />
                    </View>
                    <View className="space-y-2">
                        <View>
                            <Text className="text-2xl font-extrabold tracking-tight">
                                {product.producto_nombre}
                            </Text>
                            <Link href={`/seller/${product.user.usuario_id}`}>
                                <Text className="font-medium text-sm text-gray-500">
                                    Vendido por {product.user.usuario_alias}
                                </Text>
                            </Link>
                        </View>
                        <Text className="text-gray-700">
                            {product.producto_descripcion}
                        </Text>
                    </View>
                    <View>
                        <Text className="font-bold text-gray-600">
                            {product.producto_cantidad} Productos disponibles
                        </Text>
                        <Text className="font-bold text-lg">
                            {product.producto_precio.toLocaleString("es-CO")}{" "}
                            COP
                        </Text>
                    </View>
                    <Pressable className="bg-violet-600 p-3 rounded-lg relative">
                        <Text className="text-white font-bold text-center">
                            Agregar al carrito
                        </Text>
                        <Text className="absolute left-3 top-2.5">
                            <CartIcon color="white" size={23} />
                        </Text>
                    </Pressable>
                </View>
            )}
        </Screen>
    );
}
