export const feedbackTemplate = (email, subject, message) => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Email Confirmation</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0f0f0; color: #333; padding-top: 2rem; padding-bottom: 2rem;">
                <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; padding: 20px; border: 1px solid #ddd; text-align: center;">
                    <h1 style="font-size: 24px; color: #000; margin-bottom: 20px; font-weight: 700;">
                        Formulario Contacto 
                        <span style="font-size: 28px; color: #007bff; font-weight: 800;">AC Computers</span>
                    </h1>

                    <p style="font-size: 16px; margin: 10px 0; color: #666;">Email de contacto: <strong>${email}</strong></p>
                    <p style="font-size: 16px; margin: 10px 0; color: #666;">Asunto: <strong>${subject}</strong></p>
                    <p style="font-size: 16px; margin: 10px 0; color: #666;">Mensaje:</p>
                    <p style="font-size: 16px; margin: 10px 0; color: #333;">${message}</p>
                    
                    <a href="mailto:${email}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-size: 16px; margin: 20px 0;">
                        Responder Correo
                    </a>

                    <h2 style="font-size: 20px; margin-top: 20px; color: #007bff;">¿Algún Error?</h2>
                    <p style="font-size: 14px; color: #666;">
                        Envía la información del error al siguiente correo:
                        <a href="mailto:andres52885241@gmail.com" style="color: #007bff; text-decoration: none;">andres52885241@gmail.com</a>
                    </p>
                    <p style="font-size: 12px; color: #999;">© Andrés Gutiérrez Hurtado</p>
                </div>
            </body>
        </html>
    `;
};

export const recoverAccount = (token) => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Email Confirmation</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0f0f0; color: #333; padding-top: 2rem; padding-bottom: 2rem;">
                <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; padding: 20px; border: 1px solid #ddd; text-align: center;">
                        <span style="font-size: 28px; color: #007bff; font-weight: 800;">AC Computers</span>
                    <h1 style="font-size: 24px; color: #000; margin-bottom: 20px; margin-top: 0px; font-weight: 700;">
                        Recuperación de cuenta 
                    </h1>

                    <p style="font-size: 16px; margin: 10px 0; color: #666;">Dale click al siguiente botón para recuperar tu cuenta:</p>
                    <a href="${process.env.VITE_APP_URL}/reset_password/${token}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-size: 16px; margin: 20px 0;">
                        Recuperar cuenta
                    </a>

                    <h2 style="font-size: 20px; margin-top: 10px; color: #007bff;">¿Algún Error?</h2>
                    <p style="font-size: 14px; color: #666;">
                        Envía la información del error al siguiente correo:
                        <a href="mailto:andres52885241@gmail.com" style="color: #007bff; text-decoration: none;">andres52885241@gmail.com</a>
                    </p>
                    <p style="font-size: 12px; color: #999;">© Andrés Gutiérrez Hurtado</p>
                </div>
            </body>
        </html>
    `;
};
