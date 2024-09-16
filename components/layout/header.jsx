import { View, Image, TextInput, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { styled } from "nativewind";

// Components
import { SearchIcon } from "../icons";

export default function Header() {
    const StyledPressable = styled(Pressable);
    navigation = useNavigation();

    return (
        <View className="bg-violet-600">
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <SafeAreaView className="items-center gap-3 p-[20px]">
                <Pressable onPress={() => navigation.navigate("index")}>
                    <Image
                        source={require("../../public/logo.png")}
                        style={{
                            width: 80,
                            height: 75,
                        }}
                    />
                </Pressable>
                <View className="w-full relative">
                    <TextInput
                        placeholder="Buscar Productos..."
                        className="w-full px-3 py-1 bg-white rounded "
                    />
                    <StyledPressable className="absolute right-3 top-1 p-1.5 rounded-full active:bg-violet-200">
                        <SearchIcon size={16} />
                    </StyledPressable>
                </View>
            </SafeAreaView>
        </View>
    );
}
