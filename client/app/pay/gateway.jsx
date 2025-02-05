import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

export default function Gateway() {
    const formdata = useLocalSearchParams();
    console.log("formdata", formdata.extra2);
    //    {
    //         accountId: "512321",
    //         amount: "304900",
    //         buyerEmail: "andres52885241@gmail.com",
    //         buyerFullName: "Andrés Gutiérrez Hurtado",
    //         confirmationUrl: "http://192.168.1.11:8080/api/v1/payu/callback",
    //         currency: "COP",
    //         description: "Compra de 2 productos",
    //         extra1: '{"payerFullname":"Andrés Gutiérrez Hurtado","payerDocumentType":"CC","payerDocument":"1033707596","payerPhone":"3209202177","payerMessage":"sapo"}',
    //         extra2: '{"shippingAddress":"sapo"}',
    //         merchantId: "508029",
    //         payerDocument: "1033707596",
    //         payerDocumentType: "CC",
    //         payerMessage: "sapo",
    //         payerPhone: "3209202177",
    //         referenceCode: "compra-1997e4d2-fa0d-4cdd-b7a1-f970570a813e-1738707407320",
    //         shippingAddress: "sapo",
    //         signature: "a89afe0d60597e85c17f38a410723e54",
    //         tax: "0",
    //         taxReturnBase: "0",
    //         test: "1",
    //     };

    return (
        <>
            <Stack.Screen options={{ headerTitle: "Pasarela de pagos" }} />
            <View className="flex-1 p-5 rounded-lg">
                <WebView
                    source={{
                        html: `
                    <form method="post" action="${process.env.EXPO_PUBLIC_PAYU_REQUEST_URI}" name="formCheckout" id="formCheckout">
                        <input type="hidden" name="merchantId" value="${formdata.merchantId}" />
                        <input type="hidden" name="accountId" value="${formdata.accountId}" />
                        <input type="hidden" name="description" value="${formdata.description}" />
                        <input type="hidden" name="referenceCode" value="${formdata.referenceCode}" />
                        <input type="hidden" name="amount" value="${formdata.amount}" />
                        <input type="hidden" name="tax" value="${formdata.tax}" />
                        <input type="hidden" name="taxReturnBase" value="${formdata.taxReturnBase}" />
                        <input type="hidden" name="currency" value="${formdata.currency}" />
                        <input type="hidden" name="signature" value="${formdata.signature}" />
                        <input type="hidden" name="test" value="${formdata.test}" />
                        <input type="hidden" name="responseUrl" value="${formdata.confirmationUrl}" />
                        <input type="hidden" name="buyerFullName" value="${formdata.buyerFullName}" />
                        <input type="hidden" name="buyerEmail" value="${formdata.buyerEmail}" />
                        <input type="hidden" name="payerDocumentType" value="${formdata.payerDocumentType}" />
                        <input type="hidden" name="payerDocument" value="${formdata.payerDocument}" />
                        <input type="hidden" name="payerPhone" value="${formdata.payerPhone}" />
                        <input type="hidden" name="shippingAddress" value="${formdata.shippingAddress}" />
                        <input type="hidden" name="extra1" value='${formdata.extra1}' />
                        <input type="hidden" name="extra2" value='${formdata.extra2}' />
                        <div style="display: flex; justify-content: center; align-items: center; height: 60vh;">
                            <button type="submit" style="font-size: 60px; margin: 0 auto;">Continuar con el pago</button>
                        </div>
                    </form>
                `,
                    }}
                    style={{ flex: 1 }}
                />
            </View>
        </>
    );
}

