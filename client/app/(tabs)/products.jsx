import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    SectionListComponent,
    Text,
    View,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";

// Hooks
import { usePaginateData } from "../../hooks/useFetchData.js";
import { CartPlusIcon } from "../../components/icons";
import { useState } from "react";

export default function Products() {
    const params = useLocalSearchParams();
    const [sort, setSort] = useState(null);
    const [category, setCategory] = useState(null);
    const [limit, setLimit] = useState(4);

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
                    <View className="w-full flex-row items-center justify-between">
                        <Text className="text-3xl font-extrabold tracking-tight">Productos</Text>
                        <Picker
                            selectedValue={sort}
                            onValueChange={(itemValue) => setSort(itemValue)}
                            style={{ height: 50, width: 200 }}
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
                                        } ${!category ? "text-white" : ""}`}
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
                <View className="flex-row flex-wrap gap-5 justify-between ">
                    {products.map((product) => (
                        <View
                            key={product.product_id}
                            className="bg-white p-4 shadow-xl rounded-md w-[175px] min-h-[205px]"
                        >
                            <Link asChild href={`/products/${product.product_id}`}>
                                <Pressable className="items-center">
                                    <Image
                                        source={{ uri: product.product_image_url }}
                                        style={{ width: 105, height: 105, objectFit: "contain" }}
                                    />
                                </Pressable>
                            </Link>
                            <View className="grow pb-2">
                                <Text className="font-extrabold text-xl leading-none line-clamp-2">
                                    {product.product_name}
                                </Text>
                                <Text className="">
                                    {parseInt(product.product_price).toLocaleString("es-CO")} COP
                                </Text>
                            </View>
                            <View className="flex-row justify-between items-center p-1 w-full">
                                <Link asChild href={`/products/${product.product_id}`}>
                                    <Pressable className="bg-purple-700 h-[30px_!important] w-fit px-3 justify-center rounded-md active:bg-purple-800">
                                        <Text className="text-white">Ver</Text>
                                    </Pressable>
                                </Link>
                                <Pressable className="bg-purple-700 h-[30px_!important] w-fit px-3 justify-center rounded-md active:bg-purple-800">
                                    <Text className="text-white">
                                        <CartPlusIcon size={16} />
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
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
