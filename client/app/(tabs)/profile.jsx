import React, { useState } from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import {
    View,
    Modal,
    Text,
    Pressable,
    Image,
    ActivityIndicator,
    TextInput,
    ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";

// Contexts
import { useAuthContext } from "../../contexts/authContext.jsx";

// Hooks
import { useGetData, usePutData } from "../../hooks/useFetchData.js";
import { useValidateForm } from "../../hooks/useValidateForm.js";
import { usePickImage } from "../../hooks/usePickImage.js";

// Components
import GuestProfile from "../../components/guestProfile.jsx";
import {
    GearIcon,
    LogoutIcon,
    PencilIcon,
    StatsIcon,
    TruckIcon,
    WebIcon,
    XIcon,
} from "../../components/icons.jsx";

// Middlewares
import { useRouteMiddleware } from "../../middlewares/useRouteMiddleware.js";

export default function Profile() {
    const { id } = useLocalSearchParams();
    const { userSession, handleLogout } = useAuthContext();

    const [orderType, setOrderType] = useState(null);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [errors, setErrors] = useState([]);

    useRouteMiddleware(
        [id && !userSession, id && id !== userSession?.user_id && userSession?.role_id != 4],
        "Acceso denegado"
    );

    const {
        data: user,
        reload: reloadUser,
        loading: loadingUser,
    } = useGetData(`/users/${id || userSession?.user_id}`);

    const {
        data: userOrders,
        reload: reloadUserOrders,
        loading: loadingUserOrders,
    } = useGetData(`/users/${id || userSession?.user_id}/orders`);

    if (loadingUser || loadingUserOrders) return <ActivityIndicator size="large" color="#0000ff" />;

    if (!user || !userSession) {
        return <GuestProfile />;
    }

    const handleSubmitEdit = async (values) => {
        const data = {
            user: {
                user_name: values.user_name,
                user_lastname: values.user_lastname,
                user_alias: values.user_alias,
                user_address: values.user_address,
                user_phone: values.user_phone,
                role_id: values.role_id,
            },
        };

        if (user.worker) {
            data.worker = {
                worker_description: values.worker_description,
            };
        }

        if (values.user_image) {
            data.user_image = values.user_image;
        }

        const validation = useValidateForm({ ...data.user, ...data.worker }, "user-edit-form");
        setErrors(validation.errors || []);

        if (validation.success) {
            const response = await usePutData(`/users/${user.user_id}`, data);

            if (response.success) {
                setShowEditUserModal(false);
                reloadUser();
            }
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: `Perfil de ${user.user_name}` }} />
            <ScrollView className="w-full">
                <View className="w-full px-5 py-10 gap-5 items-center">
                    <View className="w-full items-center gap-3">
                        <Image
                            source={{
                                uri:
                                    user.user_image_url == "/images/default.jpg"
                                        ? process.env.EXPO_PUBLIC_APP_DOMAIN + user.user_image_url
                                        : user.user_image_url,
                            }}
                            className="w-20 h-20 rounded-full"
                            style={{ width: 120, height: 120, objectFit: "cover" }}
                        />
                        <View>
                            <Text className="text-2xl font-semibold text-center">
                                @{user.user_alias}
                            </Text>
                            <Text className="text-lg text-gray-500 font-medium text-center">
                                {user.role.role_name}
                            </Text>
                        </View>
                    </View>
                    <View className="w-full flex-row flex-wrap gap-4 justify-center items-center">
                        {(user.user_id === userSession.user_id || userSession.role_id == 4) && (
                            <Pressable
                                onPress={() => setShowEditUserModal(true)}
                                className="px-3 py-1 bg-gray-200 rounded-lg flex-row items-center gap-2 active:bg-gray-300"
                            >
                                <Text className="text-gray-600">
                                    <PencilIcon size={18} />
                                </Text>
                                <Text className="text-lg text-gray-600 font-semibold">
                                    Editar Perfil
                                </Text>
                            </Pressable>
                        )}
                        {(user.role_id == 2 || user.role_id == 3) && (
                            <Link asChild href={`/worker/${user.user_id}`}>
                                <Pressable className="px-3 py-1 bg-gray-200 rounded-lg flex-row items-center gap-2 active:bg-gray-300">
                                    <Text className="text-gray-600">
                                        <WebIcon size={18} />
                                    </Text>
                                    <Text className="text-lg text-gray-600 font-semibold">
                                        Ver Pefil
                                    </Text>
                                </Pressable>
                            </Link>
                        )}
                        {user.user_id === userSession.user_id && (
                            <Pressable
                                className="px-3 py-1 bg-red-500 rounded-lg flex-row items-center gap-2 active:bg-red-600"
                                onPress={async () => await handleLogout()}
                            >
                                <Text className="text-red-100">
                                    <LogoutIcon size={16} />
                                </Text>
                                <Text className="text-lg text-red-100 font-semibold">
                                    Cerrar Sesión
                                </Text>
                            </Pressable>
                        )}
                    </View>
                    <View className="w-full flex-row flex-wrap gap-4 justify-center items-center">
                        {(user.role_id == 2 || user.role_id == 3) && (
                            <>
                                <Link asChild href={`/worker/stats/${user.user_id}`}>
                                    <Pressable className="px-3 py-1 bg-gray-200 rounded-lg flex-row items-center gap-2 active:bg-gray-300">
                                        <Text className="text-gray-600">
                                            <StatsIcon />
                                        </Text>
                                        <Text className="text-lg text-gray-600 font-semibold">
                                            Estadisticas
                                        </Text>
                                    </Pressable>
                                </Link>
                                {userSession.role_id == 2 && (
                                    <Link asChild href="/worker/products">
                                        <Pressable className="px-3 py-1 bg-gray-200 rounded-lg flex-row items-center gap-2 active:bg-gray-300">
                                            <Text className="text-gray-600">
                                                <GearIcon />
                                            </Text>
                                            <Text className="text-lg text-gray-600 font-semibold">
                                                Administrar productos
                                            </Text>
                                        </Pressable>
                                    </Link>
                                )}
                                {userSession.role_id == 3 && (
                                    <Link asChild href="/worker/shippings">
                                        <Pressable className="px-3 py-1 bg-gray-200 rounded-lg flex-row items-center gap-2 active:bg-gray-300">
                                            <Text className="text-gray-600">
                                                <TruckIcon />
                                            </Text>
                                            <Text className="text-lg text-gray-600 font-semibold">
                                                Envios
                                            </Text>
                                        </Pressable>
                                    </Link>
                                )}
                            </>
                        )}
                    </View>
                    <View className="w-full flex-row flex-wrap gap-4 justify-center items-center">
                        {userSession.role_id == 4 && (
                            <>
                                <Link asChild href={`/admin/users`}>
                                    <Pressable className="px-3 py-1 bg-gray-200 rounded-lg flex-row items-center gap-2 active:bg-gray-300">
                                        <Text className="text-gray-600">
                                            <GearIcon />
                                        </Text>
                                        <Text className="text-lg text-gray-600 font-semibold">
                                            Administrar usuarios
                                        </Text>
                                    </Pressable>
                                </Link>
                                <Link asChild href={`/admin/products`}>
                                    <Pressable className="px-3 py-1 bg-gray-200 rounded-lg flex-row items-center gap-2 active:bg-gray-300">
                                        <Text className="text-gray-600">
                                            <GearIcon />
                                        </Text>
                                        <Text className="text-lg text-gray-600 font-semibold">
                                            Administrar productos
                                        </Text>
                                    </Pressable>
                                </Link>
                            </>
                        )}
                    </View>
                    {user.worker && <Text>{user.worker.worker_description}</Text>}
                </View>
                <View className="w-full px-5 py-5 gap-5 pb-[100px]">
                    <Text className="text-3xl font-extrabold ">Mis compras:</Text>
                    <View className="flex-row flex-wrap gap-3">
                        <Pressable
                            onPress={() => setOrderType(null)}
                            className={`px-3 py-1 ${
                                !orderType ? "bg-purple-700" : "bg-gray-200"
                            } rounded-lg flex-row items-center gap-2 active:bg-gray-300 border border-gray-300`}
                        >
                            <Text className={`text-lg font-medium ${!orderType && "text-white"}`}>
                                Todas
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setOrderType("pendiente")}
                            className={`px-3 py-1 ${
                                orderType == "pendiente" ? "bg-purple-700" : "bg-gray-200"
                            } rounded-lg flex-row items-center gap-2 active:bg-gray-300 border border-gray-300`}
                        >
                            <Text
                                className={`text-lg font-medium ${
                                    orderType == "pendiente" && "text-white"
                                }`}
                            >
                                Pendientes
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setOrderType("enviando")}
                            className={`px-3 py-1 ${
                                orderType == "enviando" ? "bg-purple-700" : "bg-gray-200"
                            } rounded-lg flex-row items-center gap-2 active:bg-gray-300 border border-gray-300`}
                        >
                            <Text
                                className={`text-lg font-medium ${
                                    orderType == "enviando" && "text-white"
                                }`}
                            >
                                Enviando
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setOrderType("entregado")}
                            className={`px-3 py-1 ${
                                orderType == "entregado" ? "bg-purple-700" : "bg-gray-200"
                            } rounded-lg flex-row items-center gap-2 active:bg-gray-300 border border-gray-300`}
                        >
                            <Text
                                className={`text-lg font-medium ${
                                    orderType == "entregado" && "text-white"
                                }`}
                            >
                                Entregados
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setOrderType("recibido")}
                            className={`px-3 py-1 ${
                                orderType == "recibido" ? "bg-purple-700" : "bg-gray-200"
                            } rounded-lg flex-row items-center gap-2 active:bg-gray-300 border border-gray-300`}
                        >
                            <Text
                                className={`text-lg font-medium ${
                                    orderType == "recibido" && "text-white"
                                }`}
                            >
                                Recibidos
                            </Text>
                        </Pressable>
                    </View>
                    <View className="gap-4">
                        {userOrders
                            .filter((order) => order.order_status == orderType || !orderType)
                            .map((order) => (
                                <View
                                    key={order.order_id}
                                    className="w-full bg-white border border-gray-300 rounded-xl p-4 gap-5"
                                >
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-xl font-extrabold">
                                            Pedido No° {order.order_id.split("-")[1]}:
                                        </Text>
                                        <Text className="text-lg font-medium">
                                            {new Date(order.order_date).toLocaleString("es-CO")}
                                        </Text>
                                    </View>
                                    <View className="gap-1">
                                        <View className="flex-row justify-between items-center">
                                            <Text className="text-lg">
                                                {order.orderProducts.length} producto
                                                {order.orderProducts.length > 1 && "s"}
                                            </Text>
                                            <Text className="text-lg font-medium">
                                                {parseInt(
                                                    order.paymentDetails.payment_amount
                                                ).toLocaleString("es-CO")}{" "}
                                                COP
                                            </Text>
                                        </View>
                                        <View className="w-full flex-row items-center gap-2 justify-between">
                                            <Link asChild href={`/pay/orders/${order.order_id}`}>
                                                <Pressable className="px-3 py-1 bg-gray-200 rounded-lg flex-row items-center gap-2 active:bg-gray-300 mt-2 w-[120px]">
                                                    <Text className="text-lg font-medium text-center w-full">
                                                        Ver detalles
                                                    </Text>
                                                </Pressable>
                                            </Link>
                                            <View className="px-5 py-1.5 rounded-full bg-green-500/60">
                                                <Text className="text-sm font-medium text-green-900 capitalize">
                                                    {order.order_status}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                    </View>
                </View>
            </ScrollView>
            <Modal visible={showEditUserModal} animationType="slide" transparent>
                <View className="flex-1"></View>
                <ScrollView className="w-full h-[70%] bg-white rounded-t-[30px] border border-gray-400">
                    <View className="gap-10 px-5 pt-10 pb-[50px]">
                        <View className="flex-row justify-between items-center pt-5 pr-5">
                            <Text className="text-3xl font-extrabold">Editar perfil</Text>
                            <Pressable
                                onPress={() => setShowEditUserModal(false)}
                                className="active:bg-gray-300 w-9 h-9 rounded-full flex items-center justify-center"
                            >
                                <XIcon size={25} />
                            </Pressable>
                        </View>
                        <Formik
                            initialValues={{
                                user_name: user.user_name,
                                user_lastname: user.user_lastname,
                                user_alias: user.user_alias,
                                user_phone: user.user_phone,
                                user_address: user.user_address,
                                worker_description: user?.worker?.worker_description,
                                role_id: parseInt(user.role_id).toString(),
                                user_image: null,
                            }}
                            onSubmit={handleSubmitEdit}
                        >
                            {({ handleSubmit, values, handleChange, setFieldValue }) => (
                                <View className="gap-3">
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Nombre: </Text>
                                        <TextInput
                                            placeholder="Ingresa tu nombre"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.user_name}
                                            onChangeText={handleChange("user_name")}
                                        />
                                        {errors.find((error) => error.field === "user_name") && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "user_name"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Apellidos: </Text>
                                        <TextInput
                                            placeholder="Ingresa tu apellidos"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.user_lastname}
                                            onChangeText={handleChange("user_lastname")}
                                        />
                                        {errors.find(
                                            (error) => error.field === "user_lastname"
                                        ) && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "user_lastname"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Usuario: </Text>
                                        <TextInput
                                            placeholder="Ingresa tu usuario"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.user_alias}
                                            onChangeText={handleChange("user_alias")}
                                        />
                                        {errors.find((error) => error.field === "user_alias") && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "user_alias"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Teléfono: </Text>
                                        <TextInput
                                            placeholder="Ingresa tu numero de telefono"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.user_phone}
                                            onChangeText={handleChange("user_phone")}
                                        />
                                        {errors.find((error) => error.field === "user_phone") && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "user_phone"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Dirección: </Text>
                                        <TextInput
                                            placeholder="Ingresa la dirección de tu hogar/tienda"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.user_address}
                                            onChangeText={handleChange("user_address")}
                                        />
                                        {errors.find((error) => error.field === "user_address") && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "user_address"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>
                                    {user.worker && (
                                        <View className="gap-1">
                                            <Text className="text-lg font-semibold">
                                                Descripción:{" "}
                                            </Text>
                                            <TextInput
                                                placeholder="Ingresa una descripcion para tu perfil de trabajador"
                                                className="w-full bg-white border px-3 py-1 rounded text-lg h-32"
                                                value={values.worker_description}
                                                onChangeText={handleChange("worker_description")}
                                                multiline
                                            />
                                            {errors.find(
                                                (error) => error.field === "worker_description"
                                            ) && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) =>
                                                                error.field === "worker_description"
                                                        ).message
                                                    }
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                    {user.user_id !== userSession.user_id && (
                                        <View className="gap-1">
                                            <Text className="text-lg font-semibold">Rol: </Text>
                                            <View className="border rounded">
                                                {console.log(values.role_id)}
                                                <Picker
                                                    style={{ height: 50 }}
                                                    className="w-full bg-white border px-3 py-1 rounded"
                                                    selectedValue={values.role_id}
                                                    onValueChange={handleChange("role_id")}
                                                >
                                                    <Picker.Item label="Usuario" value="1" />
                                                    <Picker.Item label="Vendedor" value="2" />
                                                    <Picker.Item label="Domiciliario" value="3" />
                                                </Picker>
                                            </View>
                                            {errors.find((error) => error.field === "role_id") && (
                                                <Text className="text-red-600">
                                                    {
                                                        errors.find(
                                                            (error) => error.field === "role_id"
                                                        ).message
                                                    }
                                                </Text>
                                            )}
                                        </View>
                                    )}

                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Imagen:</Text>
                                        <Pressable
                                            onPress={() =>
                                                usePickImage(setFieldValue, "user_image")
                                            }
                                            className="bg-gray-300 rounded-lg px-3 py-2 active:bg-gray-500"
                                        >
                                            <Text className="text-center">Seleccionar Imagen</Text>
                                        </Pressable>
                                        {values.user_image && (
                                            <View className="pt-4">
                                                <Text className="text-center font-bold leading-loose">
                                                    Imagen seleccionada:
                                                </Text>
                                                <Image
                                                    source={{ uri: values.user_image }}
                                                    style={{
                                                        width: 250,
                                                        height: 150,
                                                        alignSelf: "center",
                                                        objectFit: "contain",
                                                    }}
                                                    className="border bg-gray-300 rounded-lg"
                                                />
                                            </View>
                                        )}
                                        {errors.find(
                                            (error) => error.field === "product_image"
                                        ) && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "product_image"
                                                    ).message
                                                }
                                            </Text>
                                        )}
                                    </View>

                                    <View className="gap-1 pt-5">
                                        <Pressable
                                            className="bg-purple-700 w-full p-3 py-2 rounded-lg active:bg-purple-600 z-50"
                                            onPress={handleSubmit}
                                        >
                                            <Text className="text-white text-center">
                                                Actualizar
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </Modal>
        </>
    );
}
