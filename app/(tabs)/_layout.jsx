import { Tabs } from "expo-router";

// Components
import Header from "../../components/layout/header";
import { HomeIcon, BagIcon, CartIcon, UserIcon } from "../../components/icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                header: () => <Header />,
                tabBarStyle: { backgroundColor: "white" },
                tabBarActiveTintColor: "#7c3aed", // violet-600
                tabBarInactiveTintColor: "#6b7280", // gray-500
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                }}
            />
            <Tabs.Screen
                name="products"
                options={{
                    title: "Productos",
                    tabBarIcon: ({ color }) => <BagIcon color={color} />,
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Carrito",
                    tabBarIcon: ({ color }) => <CartIcon color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color }) => <UserIcon color={color} />,
                }}
            />
        </Tabs>
    );
}
