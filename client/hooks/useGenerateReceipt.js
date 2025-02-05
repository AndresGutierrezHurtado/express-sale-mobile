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
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="text-align: center;">Factura Express Sale</h1>
            <div style="width: 100%; display: flex; gap: 50px;">
                <div>
                    <h3>Información del Usuario</h3>
                    <p><b>Nombre:</b> ${userSession.user_name} ${userSession.user_lastname}</p>
                    <p><b>Teléfono:</b> ${userSession.user_phone || "Sin teléfono"}</p>
                    <p><b>Correo:</b> ${userSession.user_email}</p>
                </div>
                <div>
                    <h3>Información del Pedido</h3>
                    <p><b>Fecha:</b> ${new Date(order.order_date).toLocaleDateString("es-CO")}</p>
                    <p><b>Total:</b> ${parseInt(order.paymentDetails.payment_amount).toLocaleString(
                        "es-CO"
                    )} COP</p>
                    <p><b>Método de pago:</b> ${order.paymentDetails.payment_method}</p>
                </div>
            </div>
            <h3>Productos</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                    <th style="border: 1px solid black; padding: 8px; text-align: left; background-color: #f2f2f2;">Producto</th>
                    <th style="border: 1px solid black; padding: 8px; text-align: left; background-color: #f2f2f2;">Cantidad</th>
                    <th style="border: 1px solid black; padding: 8px; text-align: left; background-color: #f2f2f2;">Precio Unitario</th>
                    <th style="border: 1px solid black; padding: 8px; text-align: left; background-color: #f2f2f2;">Total</th>
                </tr>
            ${order.orderProducts
                .map(
                    (item) => `
                        <tr>
                            <td style="border: 1px solid black; padding: 8px;">
                                ${item.product.product_name}
                            </td>
                            <td style="border: 1px solid black; padding: 8px;">
                                ${item.product_quantity}
                            </td>
                            <td style="border: 1px solid black; padding: 8px;">
                                ${parseInt(item.product_price).toLocaleString("es-CO")} COP
                            </td>
                            <td style="border: 1px solid black; padding: 8px;">
                                ${(
                                    parseInt(item.product_price) * item.product_quantity
                                ).toLocaleString("es-CO")} COP
                            </td>
                        </tr>
                    `
                )
                .join("")}
            </table>
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
