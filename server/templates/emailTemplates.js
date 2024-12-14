export const recoveryTemplate = (link) => {
    return `
        <!DOCTYPE html>
        <html lang="es">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Express Sale</title>

            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: rgb(0, 0, 0, 0.05);
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    color: #000;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 50px 0px;
                }

                .header, .footer {
                    padding: 25px 10px;
                    text-align: center;
                    background-color: #161a39;
                    color: white;
                }

                .content {
                    padding: 40px;
                    color: #666;
                }

                .button {
                    display: inline-block;
                    padding: 15px 40px;
                    background-color: #18163a;
                    color: white;
                    text-decoration: none;
                    border-radius: 2px;
                    font-weight: bold;
                }
            </style>
        </head>

        <body style="background-color: rgb(0, 0, 0, 0.05);">
            <div class="container">
                <div class="content" style="padding: 20px;">
                    <h1 style="color: black; text-align: center; ">Express Sale</h1>
                </div>

                <div class="header">
                    <h2>Cambia tu contraseña</h2>
                </div>
                <div class="content" style="background-color: white !important;">
                    <p style="margin-top: 0px;">Hola,</p>
                    <p>Te hemos mandado este correo en respuesta a tu petición para cambiar tu contraseña en Express Sale.</p>
                    <p>Para cambiar tu contraseña, por favor dale clic al siguiente botón:</p>
                    <p>
                        <a href="${link}" class="button" style="text-decoration: none; color: #fff;">Cambiar contraseña</a>
                    </p>
                    <p style="margin-bottom: 0px;"><em>Por favor ignora este correo si tú no solicitaste un cambio de contraseña.</em></p>            
                </div>
                <p style="text-align: center; margin: 30px 0px; font-weight: bold; color: #666">&copy; Express Sale, 2024.</p>
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

            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: rgb(0, 0, 0, 0.05);
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    color: #000;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 50px 0px;
                }

                .header, .footer {
                    padding: 25px 10px;
                    text-align: center;
                    background-color: #161a39;
                    color: white;
                }

                .content {
                    padding: 40px;
                    color: #666;
                }

                .button {
                    display: inline-block;
                    padding: 15px 40px;
                    background-color: #18163a;
                    color: white;
                    text-decoration: none;
                    border-radius: 2px;
                    font-weight: bold;
                }
            </style>
        </head>

        <body style="background-color: rgb(0, 0, 0, 0.05);">

            <div class="container">

                <div class="content" style="padding: 20px;">
                    <h1 style="color: black; text-align: center; ">Express Sale</h1>
                </div>

                <div class="header">
                    <h2>Cambia tu contraseña</h2>
                </div>

                <div class="content" style="background-color: white !important;">
                    <p><strong>De:</strong> ${nombre}</p>
                    <p><strong>Asunto:</strong> ${asunto}</p>
                    <p><strong>Mensaje:</strong></p>
                    <p>${mensaje}</p>
                    ${
                        usuario &&
                        `<p>
                            <a href="${process.env.VITE_API_URL}/users/${usuario?.usuario_id}" class="button" style="text-decoration: none; color: #fff;">Ver más información del usuario</a>
                        </p>`
                    }
                    <p style="margin-bottom: 0px;"><em>Por favor ignora este correo, si quieres responser responde al siguiente correo: ${correo}</em></p>
                </div>

                <p style="text-align: center; margin: 30px 0px; font-weight: bold; color: #666">&copy; Express Sale, 2024.</p>
            </div>

        </body>

        </html>

    `;
};
