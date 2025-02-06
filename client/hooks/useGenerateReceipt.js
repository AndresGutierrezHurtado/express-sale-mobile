import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import { Alert } from "react-native";

export const useGenerateReceipt = async (order, userSession) => {
    try {
        const fileName = `factura_${order.order_id.split("-")[1]}.pdf`;
        const pdfPath = `${FileSystem.documentDirectory}${fileName}`;

        const html = `
        <html>
        <body style="font-family: system-ui, Arial, sans-serif; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <h1 style="font-size: 40px; font-weight: 800;">Factura Express Sale:</h1>
                <img
                    style="width: 140px; height: 130px; object-fit: contain;"
                    src="${process.env.EXPO_PUBLIC_APP_DOMAIN}/logo.png"
                />
            </div>
            <div style="width: 100%; display: flex; gap: 10px;">
                <div>
                    <h3>Información del Usuario:</h3>
                    <p><b>Nombre:</b> ${userSession.user_name} ${userSession.user_lastname}</p>
                    <p><b>Teléfono:</b> ${userSession.user_phone || "Sin teléfono"}</p>
                    <p><b>Correo:</b> ${userSession.user_email}</p>
                </div>
                <div>
                    <h3>Información del Pagador:</h3>
                    <p><b>Nombre:</b> ${order.paymentDetails.buyer_name}</p>
                    <p><b>Documento:</b> ${order.paymentDetails.buyer_document_type} ${order.paymentDetails.buyer_document_number}</p>
                    <p><b>Telefono:</b> ${order.paymentDetails.buyer_phone}</p>
                    <p><b>Correo:</b> ${order.paymentDetails.buyer_email}</p>
                </div>
                <div>
                    <h3>Información del Pedido:</h3>
                    <p><b>Fecha:</b> ${new Date(order.order_date).toLocaleDateString("es-CO")}</p>
                    <p><b>N° de pedido:</b> ${order.order_id.split("-")[1]}</p>
                    <p><b>Método de pago:</b> ${order.paymentDetails.payment_method}</p>
                    <p><b>Dirección:</b> ${order.shippingDetails.shipping_address}</p>
                </div>
            </div>
            <div style="width: 100%; height: 1px; background-color: #ccc; margin: 20px 0 10px;"></div>
            <h2>Productos:</h2>
            <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #aaa;">
                    <th style="padding: 8px; text-align: left; background-color: #f2f2f2;">Producto</th>
                    <th style="padding: 8px; text-align: left; background-color: #f2f2f2;">Cantidad</th>
                    <th style="padding: 8px; text-align: left; background-color: #f2f2f2;">Precio Unitario</th>
                    <th style="padding: 8px; text-align: left; background-color: #f2f2f2;">Total</th>
                </tr>
                ${order.orderProducts
                    .map(
                        (item) => `
                            <tr style="border-bottom: 1px solid #aaa;">
                                <td style="padding: 8px;">
                                    ${item.product.product_name}
                                </td>
                                <td style="padding: 8px;">
                                    ${item.product_quantity}
                                </td>
                                <td style="padding: 8px;">
                                    ${parseInt(item.product_price).toLocaleString("es-CO")} COP
                                </td>
                                <td style="padding: 8px;">
                                    ${(
                                        parseInt(item.product_price) * item.product_quantity
                                    ).toLocaleString("es-CO")} COP
                                </td>
                            </tr>
                        `
                    ).join("")}
                <tr>
                    <td style="text-align: right; padding: 8px;" colspan="2"></td>
                    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #aaa;">Total:</td>
                    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #aaa;">
                        ${parseInt(order.paymentDetails.payment_amount).toLocaleString("es-CO")} COP
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right; padding: 8px;" colspan="2"></td>
                    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #aaa;">Firma:</td>
                    <td style="padding: 5px; font-weight: bold; border-bottom: 1px solid #aaa;">
                        <img
                            style="width: 100px; height: auto; object-fit: contain;"
                            src="${process.env.EXPO_PUBLIC_APP_DOMAIN}/images/firma.png"
                        />
                    </td>
                </tr>
            </table>
            <div style="position: fixed; bottom: 0; left: 0; width: 100%; text-align: center;">
                <p style="font-size: 12px;">&copy; 2023 Express Sale. Todos los derechos reservados.</p>
            </div>
        </body>
        </html>
        `;

        const { uri } = await Print.printToFileAsync({ html, base64: false });

        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
            await Sharing.shareAsync(uri);
        } else {
            Alert.alert("Error", "No se puede compartir el PDF en este dispositivo.");
        }
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        Alert.alert("Error", "No se pudo generar el PDF.");
    }
};
