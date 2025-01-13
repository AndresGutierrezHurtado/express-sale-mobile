import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, View } from "react-native";
import { Stack } from "expo-router";
import { stringMd5 } from "react-native-quick-md5";
import { Formik } from "formik";

// Hooks
import { useGetData } from "../../hooks/useFetchData";

// Contexts
import { useAuthContext } from "../../contexts/authContext";

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
        //     const data = Object.fromEntries(new FormData(event.target));
        //     const validation = useValidateform(data, "pay-form");
        //     if (validation.success) {
        //         document.getElementsByName("extra1")[0].value = JSON.stringify({
        //             payerFullname: document.getElementsByName("buyerFullName")[0]?.value,
        //             payerDocumentType: document.getElementsByName("payerDocumentType")[0]?.value,
        //             payerDocument: document.getElementsByName("payerDocument")[0]?.value,
        //             payerPhone: document.getElementsByName("payerPhone")[0]?.value,
        //             payerMessage: document.getElementsByName("payerMessage")[0]?.value,
        //         });
        //         document.getElementsByName("extra2")[0].value = JSON.stringify({
        //             shippingAddress: document.getElementsByName("shippingAddress")[0]?.value,
        //             shippingCoordinates: document.getElementsByName("shippingCoordinates")[0]?.value,
        //         });
        //         event.target.submit();
        //     }
    };

    if (loadingCarts) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <>
            <Stack.Screen options={{ headerTitle: "Forma de pago" }} />
            <ScrollView className="flex-1">
                <View className="w-full px-5 py-10">
                    <View className="bg-white rounded-lg border border-gray-300 p-5 flex-1">
                        <Text className="text-2xl font-bold">Form</Text>
                        <Formik
                            initialValues={{
                                merchantId: "",
                                accountId: "",
                                description: `Compra de ${carts.length} productos`,
                                referenceCode: referenceCode,
                                amount: amount,
                                currency: "COP",
                                signature: signature,
                                test: process.env.EXPO_PUBLIC_PAYU_TEST_MODE,
                                tax: "0",
                                taxReturnBase: "0",
                                buyerEmail: "",
                                buyerFullName: "",
                                payerPhone: "",
                                payerDocumentType: "",
                                payerDocument: "",
                                payerMessage: "",
                                confirmationUrl: "http://www.test.com/confirmation",
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({ handleSubmit, handleChange, setFieldValue, values }) => (
                                <View className="gap-3">
                                    <View className="gap-1">
                                        <Text className="text-lg font-semibold">
                                            Correo electrónico:
                                        </Text>
                                        <TextInput
                                            placeholder="ejemplo@gmail.com"
                                            className="w-full bg-white border px-3 py-1 rounded text-lg"
                                            value={values.user_email}
                                            onChangeText={handleChange("user_email")}
                                        />
                                        {errors.find((error) => error.field === "user_email") && (
                                            <Text className="text-red-600">
                                                {
                                                    errors.find(
                                                        (error) => error.field === "user_email"
                                                    ).message
                                                }
                                            </Text>
                                        )}
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
