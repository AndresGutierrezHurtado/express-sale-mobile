import {
    email,
    length,
    maxValue,
    minLength,
    minValue,
    nonEmpty,
    object,
    parse,
    pipe,
    regex,
    string,
    ValiError,
} from "valibot";

export const useValidateForm = (data = {}, form = "", extra = null) => {
    try {
        let schema;

        switch (form) {
            case "login-form":
                schema = object({
                    user_email: pipe(
                        nonEmpty("Correo requerido"),
                        string("Correo requerido"),
                        email("El correo debe ser válido")
                    ),
                    user_password: pipe(
                        nonEmpty("Contraseña requerida"),
                        string("Contraseña requerida"),
                        minLength(6, "La contraseña debe tener al menos 6 caracteres")
                    ),
                });
                break;
            case "register-form":
                schema = object({
                    user_name: pipe(
                        nonEmpty("Nombre requerido"),
                        string("Nombre requerido"),
                        minLength(3, "El nombre debe tener al menos 3 caracteres")
                    ),
                    user_lastname: pipe(
                        nonEmpty("Apellido requerido"),
                        string("Apellido requerido"),
                        minLength(3, "El apellido debe tener al menos 3 caracteres")
                    ),
                    user_alias: pipe(
                        nonEmpty("Alias requerido"),
                        string("Alias requerido"),
                        regex(
                            /^[a-zA-Z0-9-_]+$/,
                            "El nickname solo puede contener letras, números, guiones y guiones bajos."
                        ),
                        minLength(10, "El usuario debe tener al menos 10 caracteres")
                    ),
                    user_email: pipe(
                        nonEmpty("Correo requerido"),
                        string("Correo requerido"),
                        email("El correo debe ser válido")
                    ),
                    user_password: pipe(
                        nonEmpty("Contraseña requerida"),
                        string("Contraseña requerida"),
                        minLength(6, "La contraseña debe tener al menos 6 caracteres")
                    ),
                    role_id: pipe(
                        nonEmpty("Rol requerido"),
                        string("Rol requerido"),
                        minLength(1, "El rol es requerido")
                    ),
                });
                break;
            case "contact-form":
                schema = object({
                    usuario_nombre: pipe(
                        nonEmpty("Nombre requerido"),
                        string("Nombre requerido"),
                        minLength(3, "El nombre es requerido")
                    ),
                    usuario_correo: pipe(
                        nonEmpty("Correo requerido"),
                        string("Correo requerido"),
                        email("El correo debe ser válido")
                    ),
                    correo_asunto: pipe(
                        nonEmpty("Asunto requerido"),
                        string("Asunto requerido"),
                        minLength(10, "El asunto debe tener al menos 10 caracteres")
                    ),
                    correo_mensaje: pipe(
                        nonEmpty("Mensaje requerido"),
                        string("Mensaje requerido"),
                        minLength(15, "El mensaje debe tener al menos 15 caracteres")
                    ),
                });
                break;
            case "user-edit-modal-form":
                schema = object({
                    usuario_nombre: pipe(
                        nonEmpty("Nombre requerido"),
                        string("Nombre requerido"),
                        minLength(3, "El nombre debe tener al menos 3 caracteres")
                    ),
                    usuario_apellido: pipe(
                        nonEmpty("Apellido requerido"),
                        string("Apellido requerido"),
                        minLength(3, "El apellido debe tener al menos 3 caracteres")
                    ),
                    usuario_alias: pipe(
                        nonEmpty("Alias requerido"),
                        string("Alias requerido"),
                        regex(
                            /^[a-zA-Z0-9-_]+$/,
                            "El nickname solo puede contener letras, números, guiones y guiones bajos."
                        ),
                        minLength(10, "El usuario debe tener al menos 10 caracteres")
                    ),
                    usuario_direccion: pipe(string("La dirección no es valida")),
                    usuario_telefono: pipe(
                        string("El teléfono no es valido"),
                        regex(/^[0-9]*$/, "El teléfono solo puede contener números"),
                        regex(/^(?:\d{0}|\d{10})$/, "El telefono debe tener 10 digitos")
                    ),
                    trabajador_descripcion: pipe(
                        regex(/^$|^.{3,}$/, "La descripción debe tener al menos 3 caracteres")
                    ),
                });
                break;
            case "rate-form":
                schema = object({
                    calificacion_comentario: pipe(
                        nonEmpty("El comentario es requerido"),
                        string("El comentario no es válido"),
                        minLength(10, "El comentario debe tener al menos 10 caracteres")
                    ),
                    calificacion: pipe(
                        nonEmpty("La calificación es requerida"),
                        string("La calificación no es valida"),
                        length(1, "Debes ingresar una calificación válida")
                    ),
                });
                break;
            case "update-product-form":
                schema = object({
                    producto_nombre: pipe(
                        nonEmpty("El nombre es requerido"),
                        string("El nombre no es valido"),
                        minLength(3, "El nombre debe tener al menos 3 caracteres")
                    ),
                    producto_precio: pipe(
                        nonEmpty("El precio es requerido"),
                        string("El precio no es valido"),
                        minLength(3, "El precio debe tener al menos 3 digitos"),
                        regex(/^[0-9]*$/, "El precio debe tener solo números")
                    ),
                    producto_descripcion: pipe(
                        nonEmpty("La descripción es requerida"),
                        string("La descripción no es valida"),
                        minLength(10, "La descripción debe tener al menos 10 caracteres")
                    ),
                    producto_cantidad: pipe(
                        nonEmpty("La cantidad es requerida"),
                        string("La cantidad no es valida"),
                        minLength(1, "La cantidad debe tener al menos 1 caracter"),
                        regex(/^[0-9]*$/, "La cantidad debe tener solo números")
                    ),
                    producto_estado: pipe(
                        nonEmpty("El estado es requerido"),
                        string("El estado no es valido")
                    ),
                    categoria_id: pipe(
                        nonEmpty("La categoría es requerida"),
                        string("La categoría no es valida"),
                        minLength(1, "La categoría debe tener al menos 1 caracter"),
                        regex(/^[0-9]*$/, "La categoría debe tener solo números")
                    ),
                });
                break;
            case "create-product-form":
                schema = object({
                    producto_nombre: pipe(
                        nonEmpty("El nombre es requerido"),
                        string("El nombre no es valido"),
                        minLength(3, "El nombre debe tener al menos 3 caracteres")
                    ),
                    producto_precio: pipe(
                        nonEmpty("El precio es requerido"),
                        string("El precio no es valido"),
                        minLength(3, "El precio debe tener al menos 3 digitos"),
                        regex(/^[0-9]*$/, "El precio debe tener solo números")
                    ),
                    producto_descripcion: pipe(
                        nonEmpty("La descripción es requerida"),
                        string("La descripción no es valida"),
                        minLength(10, "La descripción debe tener al menos 10 caracteres")
                    ),
                    producto_cantidad: pipe(
                        nonEmpty("La cantidad es requerida"),
                        string("La cantidad no es valida"),
                        minLength(1, "La cantidad debe tener al menos 1 caracter"),
                        regex(/^[0-9]*$/, "La cantidad debe tener solo números")
                    ),
                    producto_estado: pipe(
                        nonEmpty("El estado es requerido"),
                        string("El estado no es valido")
                    ),
                    categoria_id: pipe(
                        nonEmpty("La categoría es requerida"),
                        string("La categoría no es valida"),
                        minLength(1, "La categoría debe tener al menos 1 caracter"),
                        regex(/^[0-9]*$/, "La categoría debe tener solo números")
                    ),
                });
                break;
            case "pay-form":
                schema = object({
                    amount: pipe(
                        nonEmpty("La cantidad es requerida"),
                        string("La cantidad no es valida"),
                        minLength(1, "La cantidad debe tener al menos 1 caracter"),
                        regex(/^[0-9]*$/, "La cantidad debe tener solo números")
                    ),
                    buyerEmail: pipe(
                        nonEmpty("El correo es requerido"),
                        string("El correo no es valido"),
                        email("El correo no es valido")
                    ),
                    buyerFullName: pipe(
                        nonEmpty("El nombre es requerido"),
                        string("El nombre no es valido"),
                        minLength(3, "El nombre debe tener al menos 3 caracteres")
                    ),
                    payerDocument: pipe(
                        nonEmpty("El documento es requerido"),
                        string("El documento no es valido"),
                        minLength(3, "El documento debe tener al menos 3 caracteres")
                    ),
                    payerPhone: pipe(
                        nonEmpty("El telefono es requerido"),
                        string("El telefono no es valido"),
                        minLength(3, "El telefono debe tener al menos 3 caracteres")
                    ),
                    shippingAddress: pipe(
                        nonEmpty("La dirección es requerida"),
                        string("La dirección no es valida"),
                        minLength(3, "La dirección debe tener al menos 3 caracteres")
                    ),
                    payerMessage: pipe(
                        nonEmpty("El mensaje es requerido"),
                        string("El mensaje no es valido"),
                        minLength(3, "El mensaje debe tener al menos 3 caracteres")
                    ),
                });
                break;
            case "withdraw-modal-form":
                schema = object({
                    retiro_valor: pipe(
                        nonEmpty("El valor es requerido"),
                        string("El valor no es valido"),
                        regex(/^[0-9]*$/, "El valor debe tener solo números"),
                        minValue(10000, "El valor debe ser mayor a 10,000"),
                        maxValue(
                            parseInt(extra.trabajador_saldo),
                            `El valor debe ser menor a tu saldo: ${parseInt(
                                extra.trabajador_saldo
                            ).toLocaleString("es-CO")} COP`
                        )
                    ),
                });
                break;
            case "recovery-form":
                usuario_correo: {
                    schema = object({
                        usuario_correo: pipe(
                            nonEmpty("El correo es requerido"),
                            string("El correo no es valido"),
                            email("El correo no es valido")
                        ),
                    });
                }
                break;
            case "reset-password-form":
                schema = object({
                    usuario_contra: pipe(
                        nonEmpty("Contraseña requerida"),
                        string("Contraseña requerida"),
                        minLength(6, "La contraseña debe tener al menos 6 caracteres")
                    ),
                    usuario_contra_confirm: pipe(
                        nonEmpty("Contraseña requerida"),
                        string("Contraseña requerida"),
                        minLength(6, "La contraseña debe tener al menos 6 caracteres")
                    ),
                });

                break;
            default:
                return { success: false, message: "Formulario no encontrado", data: null };
                break;
        }

        const finalData = parse(schema, data);

        if (form === "reset-password-form" && data.usuario_contra !== data.usuario_contra_confirm) {
            if (data.usuario_contra !== data.usuario_contra_confirm) {
                throw new ValiError([
                    {
                        path: [{ key: "usuario_contra" }],
                        message: "Las contraseñas no coinciden",
                    },
                    {
                        path: [{ key: "usuario_contra_confirm" }],
                        message: "Las contraseñas no coinciden",
                    },
                ]);
            }
        }

        return { success: true, message: "Formulario valido", data: finalData };
    } catch (error) {
        let fieldErrors = [];

        error.issues.forEach((issue) => {
            fieldErrors.push({
                field: issue.path[0].key,
                message: issue.message,
            });
        });

        return { success: false, message: "Formulario no valido", errors: fieldErrors };
    }
};
