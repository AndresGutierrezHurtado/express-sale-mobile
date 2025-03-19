import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";

// Hooks
import { usePaginateData } from "../../hooks/useFetchData";

// Components
import ProductCard from "../../components/productCard";

export default function Home() {
    const { data: products, loading: loadingProducts } = usePaginateData("/products");

    if (loadingProducts) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView className="w-full">
            <View className="w-full p-5">
                <View
                    className="w-full h-[200px] flex-row bg-purple-700 rounded-lg"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 8,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 10.32,
                        elevation: 10,
                    }}
                >
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
                    <Link asChild href="/products?category_id=1">
                        <Pressable className="w-fit items-center gap-1">
                            <View className="w-[70px] aspect-square rounded-full overflow-hidden border-2">
                                <Image
                                    source={{
                                        uri: `${process.env.EXPO_PUBLIC_APP_DOMAIN}/images/categories/moda.jpg`,
                                    }}
                                    style={{
                                        width: 70,
                                        aspectRatio: 1,
                                        objectFit: "contain",
                                        backgroundColor: "white",
                                    }}
                                />
                            </View>
                            <Text className="w-fit text-xl font-bold">Moda</Text>
                        </Pressable>
                    </Link>
                    <Link asChild href="/products?category_id=2">
                        <Pressable className="w-fit gap-1">
                            <View className="w-fit rounded-full overflow-hidden border-2">
                                <Image
                                    source={{
                                        uri: `${process.env.EXPO_PUBLIC_APP_DOMAIN}/images/categories/comida.jpg`,
                                    }}
                                    style={{
                                        width: 70,
                                        aspectRatio: 1,
                                        objectFit: "contain",
                                        backgroundColor: "white",
                                    }}
                                />
                            </View>
                            <Text className="text-center text-xl font-bold">Comida</Text>
                        </Pressable>
                    </Link>
                    <Link asChild href="/products?category_id=3">
                        <Pressable className="w-fit items-center gap-1">
                            <View className="w-fit rounded-full overflow-hidden border-2">
                                <Image
                                    source={{
                                        uri: `${process.env.EXPO_PUBLIC_APP_DOMAIN}/images/categories/tecnologia.jpg`,
                                    }}
                                    style={{
                                        width: 70,
                                        aspectRatio: 1,
                                        objectFit: "contain",
                                        backgroundColor: "white",
                                    }}
                                />
                            </View>
                            <Text className="text-center text-xl font-bold">Tecnologia</Text>
                        </Pressable>
                    </Link>
                    <Link asChild href="/products?category_id=4">
                        <Pressable className="w-fit gap-1">
                            <View className="w-fit rounded-full overflow-hidden border-2">
                                <Image
                                    source={{
                                        uri: `https://img.freepik.com/fotos-premium/mano-sosteniendo-bolsas-papel-multicolores-aisladas-blanco-concepto-compras_106006-1469.jpg`,
                                    }}
                                    style={{
                                        width: 70,
                                        aspectRatio: 1,
                                        objectFit: "contain",
                                        backgroundColor: "white",
                                    }}
                                />
                            </View>
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
                        <ProductCard key={product.product_id} product={product} />
                    ))}
                </ScrollView>
            </View>
            <View className="w-full p-5 pb-[100px] gap-5">
                <View className="items-center">
                    <Image
                        source={{
                            uri: `${process.env.EXPO_PUBLIC_APP_DOMAIN}/logo.png`,
                        }}
                        style={{ width: 150, height: 120, objectFit: "contain" }}
                    />
                </View>
                <Text className="text-3xl font-extrabold tracking-tight text-center">
                    ¿Quiénes <Text className="text-purple-700">Somos?</Text>
                </Text>

                <View className="gap-2">
                    <Text className="text-balance text-center text-lg leading-[1.1]">
                        Express Sale ha sido creado por:{" "}
                        <Text className="font-bold text-purple-700 italic">
                            Andrés Gutiérrez, Juan Sebastián Bernal, Jaider Harley Rondón y David
                            Fernando Díaz.
                        </Text>{" "}
                        Juntos, han planeado y desarrollado esta herramienta para facilitar la
                        conexión entre comerciantes y clientes, ofreciendo una plataforma accesible
                        para todos.
                    </Text>
                    <Text className="text-balance text-center text-lg leading-[1.1]">
                        En Express Sale, nuestra misión es{" "}
                        <Text className="font-bold text-purple-700">
                            llevar las tiendas de barrio al mundo digital
                        </Text>
                        , ayudándolas a expandir su alcance y competir en el mercado actual.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
