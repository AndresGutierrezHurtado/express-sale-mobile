import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Stack } from "expo-router";
import { stringMd5 } from "react-native-quick-md5";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";

// Hooks
import { useGetData } from "../../hooks/useFetchData";

// Contexts
import { useAuthContext } from "../../contexts/authContext";
import { useValidateForm } from "../../hooks/useValidateForm";

export default function Form() {
    const { userSession } = useAuthContext();
    const [errors, setErrors] = useState([]);

    const { data: carts, loading: loadingCarts } = useGetData(
        `/users/${userSession.user_id}/carts`
    );

    // Payu config
    const amount = carts?.reduce((t, c) => t + c.product_quantity * c.product.product_price, 0);
    const referenceCode = `compra-${userSession.user_id}-${Date.now()}`;

    const signature = stringMd5(
        `${process.env.EXPO_PUBLIC_PAYU_API_KEY}~${process.env.EXPO_PUBLIC_PAYU_MERCHANT_ID}~${referenceCode}~${amount}~COP`
    );

    const handleSubmit = (values) => {
        const data = {
            ...values,
            extra1: JSON.stringify({
                payerFullname: values.buyerFullName,
                payerDocumentType: values.payerDocumentType,
                payerDocument: values.payerDocument,
                payerPhone: values.payerPhone,
                payerMessage: values.payerMessage,
            }),
            extra2: JSON.stringify({
                shippingAddress: values.shippingAddress,
                shippingCoordinates: values.shippingCoordinates,
            }),
        };

        const validation = useValidateForm(values, "pay-form");
        setErrors(validation.errors || []);

        if (validation.success) {
            console.log(data);
        }
    };

    if (loadingCarts) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <>
            <Stack.Screen options={{ headerTitle: "Forma de pago" }} />
            <ScrollView className="flex-1">
                <View className="w-full px-5 py-10">
                    <View className="bg-white rounded-lg border border-gray-300 p-5 flex-1 gap-5">
                        <Text className="text-2xl font-bold">Formulario para el pago</Text>
                        <Formik
                            initialValues={{
                                merchantId: process.env.EXPO_PUBLIC_PAYU_MERCHANT_ID,
                                accountId: process.env.EXPO_PUBLIC_PAYU_ACCOUNT_ID,
                                description: `Compra de ${carts.length} productos`,
                                referenceCode: referenceCode,
                                amount: amount,
                                currency: "COP",
                                signature: signature,
                                test: process.env.EXPO_PUBLIC_PAYU_TEST_MODE,
                                tax: "0",
                                taxReturnBase: "0",
                                buyerEmail: userSession.user_email,
                                buyerFullName:
                                    userSession.user_name + " " + userSession.user_lastname,
                                payerPhone: userSession.user_phone,
                                payerDocumentType: "CC",
                                payerDocument: "",
                                payerMessage: "",
                                confirmationUrl: process.env.EXPO_PUBLIC_API_URL + "/payu/callback",
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({ handleSubmit, handleChange, setFieldValue, values }) => (
                                <View className="gap-3">
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">
                                            Nombre Completo:
                                        </Text>
                                        <TextInput
                                            placeholder="Ingresa tus nombres y apellidos"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.buyerFullName}
                                            onChangeText={handleChange("buyerFullName")}
                                        />
                                        {errors
                                            .filter((error) => error.field === "buyerFullName")
                                            .map((error) => (
                                                <Text key={error.field} className="text-red-600">
                                                    {error.message}
                                                </Text>
                                            ))}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">
                                            Correo electrónico:
                                        </Text>
                                        <TextInput
                                            placeholder="ejemplo@gmail.com"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.buyerEmail}
                                            onChangeText={handleChange("buyerEmail")}
                                        />
                                        {errors
                                            .filter((error) => error.field === "buyerEmail")
                                            .map((error) => (
                                                <Text key={error.field} className="text-red-600">
                                                    {error.message}
                                                </Text>
                                            ))}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">Documento:</Text>
                                        <View className="flex-row gap-2">
                                            <View className="border rounded w-1/3">
                                                <Picker
                                                    selectedValue={values.payerDocumentType}
                                                    onValueChange={(itemValue) =>
                                                        setFieldValue(
                                                            "payerDocumentType",
                                                            itemValue
                                                        )
                                                    }
                                                >
                                                    {["CC", "TI", "CE", "PS"].map((item) => (
                                                        <Picker.Item
                                                            key={item}
                                                            label={item}
                                                            value={item}
                                                        />
                                                    ))}
                                                </Picker>
                                            </View>
                                            <View className="w-1/3 grow">
                                                <TextInput
                                                    placeholder="Ingresa tu número de documento"
                                                    className="w-full bg-white border px-3 py-1 rounded text-lg"
                                                    value={values.payerDocument}
                                                    onChangeText={handleChange("payerDocument")}
                                                />
                                            </View>
                                        </View>
                                        {errors
                                            .filter((error) => error.field === "payerDocument")
                                            .map((error) => (
                                                <Text key={error.field} className="text-red-600">
                                                    {error.message}
                                                </Text>
                                            ))}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">
                                            Número de Teléfono:
                                        </Text>
                                        <TextInput
                                            placeholder="Ingresa tu número de teléfono"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.payerPhone}
                                            onChangeText={handleChange("payerPhone")}
                                        />
                                        {errors
                                            .filter((error) => error.field === "payerPhone")
                                            .map((error) => (
                                                <Text key={error.field} className="text-red-600">
                                                    {error.message}
                                                </Text>
                                            ))}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">
                                            Dirección de envío:
                                        </Text>
                                        <TextInput
                                            placeholder="Ingresa la dirección de envío"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.shippingAddress}
                                            onChangeText={handleChange("shippingAddress")}
                                        />
                                        {errors
                                            .filter((error) => error.field === "shippingAddress")
                                            .map((error) => (
                                                <Text key={error.field} className="text-red-600">
                                                    {error.message}
                                                </Text>
                                            ))}
                                    </View>
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">
                                            Mensaje del Pagador:
                                        </Text>
                                        <TextInput
                                            placeholder="Ingresa un mensaje"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg h-32"
                                            value={values.payerMessage}
                                            onChangeText={handleChange("payerMessage")}
                                            multiline
                                            textAlignVertical="top"
                                            numberOfLines={4}
                                        />
                                        {errors
                                            .filter((error) => error.field === "payerMessage")
                                            .map((error) => (
                                                <Text key={error.field} className="text-red-600">
                                                    {error.message}
                                                </Text>
                                            ))}
                                    </View>
                                    <View className="gap-4 pt-5">
                                        <View className="gap-1">
                                            <Text className="text-gray-600 font-medium leading-none">
                                                Debes tener en cuenta que a la hora de realizar el
                                                pago no se guardará hasta que la transacción se
                                                complete correctamente.
                                            </Text>
                                            <Text className="text-gray-600 font-medium leading-none">
                                                Además al recibir la alerta de que ya se pagó,
                                                <Text className="text-purple-700 font-bold">
                                                    deberas darle al botón de regresar al sitio de
                                                    la tienda.
                                                </Text>
                                            </Text>
                                        </View>
                                        <Pressable
                                            onPress={handleSubmit}
                                            className="py-2 px-10 bg-purple-700 rounded-lg"
                                        >
                                            <Text className="text-white text-center text-lg">
                                                Pagar
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
