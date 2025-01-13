import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { Link, Stack } from "expo-router";
import { Row, Rows, Table } from "react-native-table-component";

// Hooks
import { useDeleteData, usePaginateData } from "../../hooks/useFetchData";

// Components
import { PencilIcon, TrashIcon } from "../../components/icons";

export default function Users() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("user_date:asc");

    const {
        data: users,
        loading: loadingUsers,
        reload: reloadUsers,
        count: countUsers,
    } = usePaginateData(`/users?search=${search}&page=${page}&sort=${sort}`);

    const handleDeleteUser = async (id) => {
        const response = await useDeleteData(`/users/${id}`);

        if (response.success) reloadUsers();
    };

    if (loadingUsers) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <View className="w-full">
            <View className="w-full p-5 gap-8">
                <TextInput
                    placeholder="Buscar usuario"
                    className="bg-white border border-gray-400 rounded-md p-2 mb-2"
                    value={search}
                    onChangeText={(value) => {
                        setPage(1);
                        setSearch(value);
                    }}
                />
                <Table
                    borderStyle={{ borderWidth: 1, borderColor: "black" }}
                    style={{ backgroundColor: "white" }}
                >
                    <Row
                        data={[
                            <Text className="font-bold p-1" onPress={() => setSort("user_id:asc")}>ID</Text>, 
                            <Text className="font-bold p-1" onPress={() => setSort("user_name:asc")}>Nombre</Text>, 
                            <Text className="font-bold p-1" onPress={() => setSort("user_alias:asc")}>Usuario</Text>, 
                            <Text className="font-bold p-1">Editar</Text>, 
                            <Text className="font-bold p-1">Eliminar</Text>
                        ]}
                        style={{ backgroundColor: "lightgray" }}
                        textStyle={{ padding: 5 }}
                    />
                    <Rows
                        data={users.map((user) => [
                            <Text className="p-1">{user.user_id.split("-")[1]}</Text>,
                            <Text className="p-1">{`${user.user_name} ${user.user_lastname}`}</Text>,
                            <Text className="p-1">{user.user_alias}</Text>,
                            <Link asChild href={`/profile?id=${user.user_id}`}>
                                <Pressable className="bg-purple-700 px-2 py-2 rounded-md w-10 m-auto active:bg-purple-800">
                                    <PencilIcon size={18} color="#fff" />
                                </Pressable>
                            </Link>,
                            <Pressable
                                onPress={() => handleDeleteUser(user.user_id)}
                                className="bg-red-600 px-2 py-2 rounded-md w-10 m-auto active:bg-red-700"
                            >
                                <TrashIcon size={18} color="#fff" />
                            </Pressable>,
                        ])}
                    />
                </Table>

                <View className="flex-row items-center justify-between w-full bg-white p-3 rounded-lg border border-gray-200">
                    <Text className="m-0.5">
                        {`Mostrando ${(page - 1) * 5 + 1} - ${
                            (page - 1) * 5 + users.length
                        } de ${countUsers}`}
                    </Text>
                    <View className="flex-row justify-center gap-2">
                        <Pressable
                            onPress={() => setPage(page - 1)}
                            disabled={page <= 1}
                            className="bg-gray-300 rounded-lg px-3 py-2 active:bg-gray-500 disabled:opacity-50"
                        >
                            <Text className="mx-0.5">Prev</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setPage(page + 1)}
                            disabled={page == Math.ceil(countUsers / 5)}
                            className="bg-gray-300 rounded-lg px-3 py-2 active:bg-gray-500 disabled:opacity-50"
                        >
                            <Text className="mx-0.5">Next</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}
