export const recoveryTemplate = (link) => {
    return `
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>Express Sale</title>
            </head>
            <body style="margin: 0; padding: 20px 10px; background-color: rgb(0, 0, 0, 0.05); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: #000;">
                <div style="max-width: 600px; margin: 0 auto; padding: 50px 0;">
                    <div style="padding: 0px 0px 30px;">
                        <h1 style="color: black; text-align: center; font-weight: 800; font-size: 40px; margin: 0px;">Express Sale</h1>
                    </div>

                    <div style="padding: 25px 10px; text-align: center; background-color: #161a39; color: white;">
                        <h2>Cambia tu contraseña</h2>
                    </div>

                    <div style="padding: 40px; background-color: white !important; color: #666;">
                        <p style="margin-top: 0;">Hola,</p>
                        <p>Te hemos mandado este correo en respuesta a tu petición para cambiar tu contraseña en Express Sale.</p>
                        <p>Para cambiar tu contraseña, por favor dale clic al siguiente botón:</p>

                        <p>
                            <a href="${link}" style="display: inline-block; padding: 15px 40px; background-color: #18163a; color: white; text-decoration: none; border-radius: 2px; font-weight: bold;">Cambiar contraseña</a>
                        </p>
                        <p style="margin-bottom: 0;"><em>Por favor ignora este correo si tú no solicitaste un cambio de contraseña.</em></p>
                    </div>

                    <p style="text-align: center; margin: 30px 0; font-weight: bold; color: #666;">&copy; Express Sale, 2024.</p>
                </div>
            </body>
        </html>
    `;
};

export const feedbackTemplate = (asunto, mensaje, nombre, correo, usuario) => {
    return `
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>Express Sale</title>
            </head>
            <body style="margin: 0; padding: 20px 10px; background-color: rgb(0, 0, 0, 0.05); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: #000;">
                <div style="max-width: 600px; margin: 0 auto; padding: 50px 0;">
                    <div style="padding: 0px 0px 30px;">
                    <h1 style="color: black; text-align: center; font-weight: 800; font-size: 40px; margin: 0px;">Express Sale</h1>
                    </div>

                    <div style="padding: 25px 10px; text-align: center; background-color: #161a39; color: white;">
                    <h2>Información formulario de contacto</h2>
                    </div>

                    <div style="padding: 40px; background-color: white !important; color: #666;">
                        <p><strong>De:</strong> ${nombre}</p>
                        <p><strong>Asunto:</strong> ${asunto}</p>
                        <p><strong>Mensaje:</strong></p>
                        <p>${mensaje}</p>
                        ${
                            usuario &&
                            `
                            <p>
                                <a href="${process.env.EXPO_PUBLIC_APP_DOMAIN}/users/${usuario?.user_id}" style="display: inline-block; padding: 15px 40px; background-color: #18163a; color: white; text-decoration: none; border-radius: 2px; font-weight: bold;">Ver más información del usuario</a>
                            </p>
                            `
                        }
                        <p style="margin-bottom: 0;"><em>Por favor ignora este correo, si quieres responser responde al siguiente correo: ${correo}</em></p>
                    </div>

                    <p style="text-align: center; margin: 30px 0; font-weight: bold; color: #666;">&copy; Express Sale, 2024.</p>
                </div>
            </body>
        </html>
    `;
};

export const orderTemplate = (order) => {
    return `
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Confirmación de Pedido</title>
    </head>

    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; display: flex; justify-content: center;">
    <div style="max-width: 600px; width: 100%; background: #ffffff; border: 1px solid #ddd; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); margin: 10px auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
            <div style="font-size: 24px; font-weight: bold; width: 100%;">Express Sale</div>
            <div style="width: 100%;"></div>
            <span style="font-size: 16px; font-weight: bold;">Pedido #${
                order.order_id.split("-")[1]
            }</span>
        </div>
        <div style="text-align: start; margin: 20px 0 10px; font-size: 18px; font-weight: bold;">
            ¡Gracias por tu compra!
        </div>
        <div style="margin-bottom: 20px;">
            Muchas gracias por confiar en nosotros, puedes ver el estado de tu pedido en tu perfil o dale clic al siguiente boton:
        </div>
        <div style="text-align: center; margin-bottom: 20px;">
            <a 
                href="${process.env.EXPO_PUBLIC_APP_DOMAIN}/pay/order/${order.order_id}" 
                style="background-color: #7E22CE; color: #ffffff; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;"
            >
                Ver Pedido
            </a>
        </div>
        <div style="border-top: 1px solid #ddd; padding-top: 20px;">
            <h3 style="margin: 0;">Resumen del Pedido</h3>
            ${order.orderProducts
                .map(
                    (p) => `
                    <div style="display: flex; justify-content: space-between; padding: 10px 0px;">
                        <div> ${p.product.product_name} x ${p.product_quantity} </div>
                        <div> ${p.product_price * p.product_quantity} </div>
                    </div>
                    `
                )
                .join("")}
            <div style="border-top: 3px solid #ddd;">
                <div style="display: flex; justify-content: space-between; padding: 10px 0px; gap: 20px; font-size: 18px;">
                    <div style="width: 100%;"></div>
                    <div> Total: </div>
                    <div> $${order.paymentDetails.payment_amount} </div>
                </div>
            </div>
            <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px;">
                <h3 style="margin: 0;">Información del Comprador</h3>
                <p style="margin: 10px 0 0;">${order.paymentDetails.buyer_name}</p>
                <p style="margin: 0">${order.paymentDetails.buyer_email}</p>
                <p style="margin: 0">${order.paymentDetails.buyer_document_number}</p>
                <p style="margin: 0">${order.shippingDetails.shipping_address}</p>
            </div>
        </div>
    </body>

    </html>
`;
};
