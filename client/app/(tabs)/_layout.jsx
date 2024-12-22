import { Tabs } from "expo-router";
import { HomeIcon, ShopIcon, CartIcon, ProfileIcon } from "../../components/icons";

import tabBarStyle from "../../layouts/tabBar.jsx";
import Header from "../../layouts/header.jsx";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#7C3AED",
                tabBarInactiveTintColor: "gray",
                safeAreaInsets: { bottom: 20 },
                tabBarStyle,
                header: () => <Header />,
            }}
        >
            <Tabs.Screen name="index" options={{ title: "Inicio", tabBarIcon: HomeIcon }} />
            <Tabs.Screen name="products" options={{ title: "Tienda", tabBarIcon: ShopIcon }} />
            <Tabs.Screen name="cart" options={{ title: "Carrito", tabBarIcon: CartIcon }} />
            <Tabs.Screen name="profile" options={{ title: "Perfil", tabBarIcon: ProfileIcon, headerShown: false }} />
        </Tabs>
    );
}
