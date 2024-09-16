import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{ title: "Inicio", tabBarIcon: () => null }}
            />
            <Tabs.Screen
                name="products"
                options={{ title: "Productos", tabBarIcon: () => null }}
            />
            <Tabs.Screen
                name="cart"
                options={{ title: "Carrito", tabBarIcon: () => null }}
            />
            <Tabs.Screen
                name="profile"
                options={{ title: "Perfil", tabBarIcon: () => null }}
            />
        </Tabs>
    );
}
