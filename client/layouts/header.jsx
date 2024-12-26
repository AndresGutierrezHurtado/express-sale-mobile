import React, { useState } from "react";
import { Link, router } from "expo-router";
import { View, Text, Image, TextInput, Pressable } from "react-native";
import { SearchIcon } from "../components/icons";

export default function Header() {
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        const query = search.trim();
        setSearch("");
        router.push(`/products?search=${query}`);
    };

    return (
        <View
            className="w-full bg-purple-700 p-5 items-center gap-2"
            style={{
                borderEndEndRadius: 20,
                borderStartEndRadius: 20,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
        >
            <Image
                source={{ uri: `${process.env.EXPO_PUBLIC_APP_DOMAIN}/logo.png` }}
                style={{ width: 100, height: 100, objectFit: "contain" }}
            />
            <View className="w-full flex-row items-center bg-white rounded-lg px-3 gap-2">
                <Text className="text-gray-400">
                    <SearchIcon size={16} />
                </Text>
                <TextInput
                    className="grow text-xl"
                    placeholder="Buscar productos..."
                    value={search}
                    onChangeText={setSearch}
                />
                {search && (
                    <Pressable onPress={handleSearch}>
                        <Text className="text-black">Buscar</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
}
