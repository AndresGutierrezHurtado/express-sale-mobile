import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{ title: "Inicio", headerShown: false, tabBarIcon: null }}
            />
            <Tabs.Screen
                name="products"
                options={{ title: "Tienda", headerShown: false, tabBarIcon: null }}
            />
            <Tabs.Screen
                name="cart"
                options={{ title: "Carrito", headerShown: false, tabBarIcon: null }}
            />
            <Tabs.Screen
                name="profile"
                options={{ title: "Perfil", headerShown: false, tabBarIcon: null }}
            />
        </Tabs>
    );
}
