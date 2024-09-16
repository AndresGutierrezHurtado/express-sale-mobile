import { Tabs } from "expo-router";
import { HomeIcon, BagIcon, CartIcon, UserIcon } from "../../components/icons";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{ title: "Inicio", tabBarIcon: () => <HomeIcon /> }}
            />
            <Tabs.Screen
                name="products"
                options={{ title: "Productos", tabBarIcon: () => <BagIcon /> }}
            />
            <Tabs.Screen
                name="cart"
                options={{ title: "Carrito", tabBarIcon: () => <CartIcon /> }}
            />
            <Tabs.Screen
                name="profile"
                options={{ title: "Perfil", tabBarIcon: () => <UserIcon /> }}
            />
        </Tabs>
    );
}
