import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

export default function RateModal({ isModalOpen, setModalOpen, reload, id, type }) {
    return (
        <Modal visible={isModalOpen} animationType="slide" transparent>
            <View className="flex-1"></View>
            <ScrollView className="w-full h-[70%] bg-white rounded-t-[30px] border border-gray-400">
                <View className="gap-10 px-5 pt-10 pb-[50px]">
                    <View className="flex-row justify-between items-center pt-5 pr-5">
                        <Text className="text-3xl font-extrabold">
                            Calificar {type === "product" ? "producto" : "usuario"}
                        </Text>
                        <Pressable
                            className="bg-gray-300 w-fit p-3 py-2 rounded-full active:bg-gray-200 z-50"
                            onPress={() => setModalOpen(false)}
                        >
                            <Text className="text-gray-800 text-center">X</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
}
