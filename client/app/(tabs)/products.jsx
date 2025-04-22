import { useCallback, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { Link, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";

// Hooks
import { usePaginateData } from "../../hooks/useFetchData.js";

// Components
import ProductCard from "../../components/productCard.jsx";

export default function Products() {
    const params = useLocalSearchParams();
    const [sort, setSort] = useState(null);
    const [category, setCategory] = useState(null);
    const [limit, setLimit] = useState(4);

    useFocusEffect(
        useCallback(() => {
            setCategory(parseInt(params.category_id, 10));
            return () => {
                router.setParams({});
            };
        }, [params.category_id])
    );

    const {
        data: products,
        count: countProducts,
        loading: loadingProducts,
    } = usePaginateData(
        `/products?limit=${limit}&${params.search ? `search=${params.search}&` : ""}${
            sort ? `sort=${sort}&` : ""
        }${category ? `category_id=${category}&` : ""}`
    );

    if (loadingProducts) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <ScrollView className="w-full">
            <View className="w-full p-5 pb-[100px] gap-5">
                <View className="gap-2">
                    <View className="w-full flex-row flex-wrap gap-2 items-center justify-between">
                        <Text className="text-3xl font-extrabold tracking-tight">Productos</Text>
                        <Picker
                            selectedValue={sort}
                            onValueChange={(itemValue) => setSort(itemValue)}
                            style={{ height: 50, width: 200, backgroundColor: "transparent" }}
                        >
                            <Picker.Item label="Relevancia" value={null} />
                            <Picker.Item label="Precio: Menor a Mayor" value="product_price:asc" />
                            <Picker.Item label="Precio: Mayor a Menor" value="product_price:desc" />
                            <Picker.Item label="Nombre: A-Z" value="product_name:asc" />
                            <Picker.Item label="Nombre: Z-A" value="product_name:desc" />
                        </Picker>
                    </View>
                    <ScrollView horizontal={true}>
                        <View className="flex-row gap-5 py-3">
                            <Pressable onPress={() => setCategory(null)}>
                                <View
                                    className={`px-3 py-1 rounded ${
                                        !category ? "bg-purple-700" : "bg-gray-300"
                                    }`}
                                >
                                    <Text
                                        className={`text-xl font-bold ${
                                            !category ? "text-white" : ""
                                        }`}
                                    >
                                        Todos
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => setCategory(1)}>
                                <View
                                    className={`px-3 py-1 rounded ${
                                        category === 1 ? "bg-purple-700" : "bg-gray-300"
                                    }`}
                                >
                                    <Text
                                        className={`text-xl font-bold ${
                                            category === 1 ? "text-white" : ""
                                        }`}
                                    >
                                        Moda
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => setCategory(2)}>
                                <View
                                    className={`px-3 py-1 rounded ${
                                        category === 2 ? "bg-purple-700" : "bg-gray-300"
                                    }`}
                                >
                                    <Text
                                        className={`text-xl font-bold ${
                                            category === 2 ? "text-white" : ""
                                        }`}
                                    >
                                        Comida
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => setCategory(3)}>
                                <View
                                    className={`px-3 py-1 rounded ${
                                        category === 3 ? "bg-purple-700" : "bg-gray-300"
                                    }`}
                                >
                                    <Text
                                        className={`text-xl font-bold ${
                                            category === 3 ? "text-white" : ""
                                        }`}
                                    >
                                        Tecnología
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => setCategory(4)}>
                                <View
                                    className={`px-3 py-1 rounded ${
                                        category === 4 ? "bg-purple-700" : "bg-gray-300"
                                    }`}
                                >
                                    <Text
                                        className={`text-xl font-bold ${
                                            category === 4 ? "text-white" : ""
                                        }`}
                                    >
                                        Otros
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
                <View className="flex-row flex-wrap gap-5 justify-between">
                    {products.length === 0 && (
                        <Text className="text-2xl font-bold w-full text-center">
                            No se encontraron productos...
                        </Text>
                    )}
                    {products.map((product) => (
                        <ProductCard key={product.product_id} product={product} />
                    ))}
                </View>
                <View className="flex-row justify-between items-center gap-5">
                    {limit > 4 && countProducts > 4 && (
                        <Pressable
                            onPress={() => setLimit((prev) => prev - 4)}
                            className="bg-gray-300 h-[40px] grow justify-center items-center rounded-md active:bg-gray-200"
                        >
                            <Text className="text-xl font-bold">Ver menos</Text>
                        </Pressable>
                    )}
                    <Pressable
                        onPress={() => setLimit((prev) => prev + 4)}
                        disabled={limit >= countProducts}
                        className="bg-gray-300 h-[40px] grow justify-center items-center rounded-md active:bg-gray-200 disabled:opacity-50"
                    >
                        <Text className="text-xl font-bold">Cargar más</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}
