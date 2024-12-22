import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";

// Hooks
import { usePaginateData } from "../../hooks/useFetchData";

// Components
import { CartPlusIcon } from "../../components/icons";

export default function Home() {
    const { data: products, loading: loadingProducts } = usePaginateData("/products");

    if (loadingProducts) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView className="w-full">
            <View className="w-full p-5">
                <View className="w-full h-[200px] flex-row bg-purple-700 rounded-lg">
                    <View className="w-2/3 h-full p-5 gap-1">
                        <Text className="text-4xl font-extrabold text-white leading-none">
                            ¡Bienvenidos a <Text className="text-yellow-500">Express Sale!</Text>
                        </Text>
                        <Text className="text-white text-lg leading-[1.15]">
                            Acá puedes obtener los mejores productos de las tiendas de barrio.
                        </Text>
                    </View>
                    <View className="w-1/3 h-full">
                        <Image
                            source={{
                                uri: "https://png.pngtree.com/png-clipart/20231002/original/pngtree-man-with-shopping-cart-png-image_13228575.png",
                            }}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </View>
                </View>
            </View>
            <View className="w-full p-5">
                <Text className="text-3xl font-extrabold tracking-tight">Categorias</Text>
                <View className="w-full flex-row justify-between mt-5">
                    <Link asChild href={{ pathname: "/products", params: { category_id: 1 } }}>
                        <Pressable className="w-fit gap-1">
                            <View className="w-[70px] mx-auto aspect-square rounded-[50%] border-2"></View>
                            <Text className="text-center text-xl font-bold">Moda</Text>
                        </Pressable>
                    </Link>
                    <Link asChild href={{ pathname: "/products", params: { category_id: 2 } }}>
                        <Pressable className="w-fit gap-1">
                            <View className="w-[70px] mx-auto aspect-square rounded-[50%] border-2"></View>
                            <Text className="text-center text-xl font-bold">Tecnologia</Text>
                        </Pressable>
                    </Link>
                    <Link asChild href={{ pathname: "/products", params: { category_id: 3 } }}>
                        <Pressable className="w-fit gap-1">
                            <View className="w-[70px] mx-auto aspect-square rounded-[50%] border-2"></View>
                            <Text className="text-center text-xl font-bold">Comida</Text>
                        </Pressable>
                    </Link>
                    <Link asChild href={{ pathname: "/products", params: { category_id: 4 } }}>
                        <Pressable className="w-fit gap-1">
                            <View className="w-[70px] mx-auto aspect-square rounded-[50%] border-2"></View>
                            <Text className="text-center text-xl font-bold">Otros</Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
            <View className="w-full p-5">
                <View className="w-full flex-row justify-between items-end">
                    <Text className="text-3xl font-extrabold tracking-tight">Productos</Text>
                    <Link asChild href="/products">
                        <Text className="text-lg">ver todos &gt;&gt;</Text>
                    </Link>
                </View>

                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{
                        flexDirection: "row",
                        justifyContent: "center",
                        justifyContent: "space-between",
                        gap: 20,
                    }}
                    className="w-full py-6 mt-5"
                >
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
                </ScrollView>
            </View>
        </ScrollView>
    );
}
