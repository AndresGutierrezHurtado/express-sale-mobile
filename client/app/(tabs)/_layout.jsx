import { Tabs } from "expo-router";
import { HomeIcon, ShopIcon, CartIcon, ProfileIcon } from "../../components/icons";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{ title: "Inicio", tabBarIcon: HomeIcon }}
            />
            <Tabs.Screen
                name="products"
                options={{ title: "Tienda", tabBarIcon: ShopIcon }}
            />
            <Tabs.Screen
                name="cart"
                options={{ title: "Carrito", tabBarIcon: CartIcon }}
            />
            <Tabs.Screen
                name="profile"
                options={{ title: "Perfil", tabBarIcon: ProfileIcon }}
            />
        </Tabs>
    );
}
