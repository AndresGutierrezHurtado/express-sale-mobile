const { DataTypes } = require("sequelize");
const conn = require("../config/connection");

// Modelo para la tabla Pedidos (Order)
const Order = conn.define(
    "Order",
    {
        pedidoId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "pedido_id", // Nombre en la tabla
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "usuario_id",
        },
        pedidoFecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "pedido_fecha",
        },
        pedidoEstado: {
            type: DataTypes.ENUM(
                "pendiente",
                "enviando",
                "entregado",
                "recibido"
            ),
            allowNull: false,
            defaultValue: "pendiente",
            field: "pedido_estado",
        },
    },
    {
        tableName: "pedidos", // Nombre exacto de la tabla
        timestamps: false,
    }
);

// Modelo para la tabla Detalles de Pagos (PaymentDetails)
const PaymentDetails = conn.define(
    "PaymentDetails",
    {
        pagoId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "pago_id",
        },
        pedidoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "pedido_id",
        },
        pagoMetodo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "pago_metodo",
        },
        pagoValor: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
            field: "pago_valor",
        },
        compradorNombre: {
            type: DataTypes.STRING(100),
            field: "comprador_nombre",
        },
        compradorCorreo: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "comprador_correo",
        },
        compradorTipoDocumento: {
            type: DataTypes.ENUM("CC", "CE", "TI", "PPN", "NIT", "SSN", "EIN"),
            allowNull: false,
            defaultValue: "CC",
            field: "comprador_tipo_documento",
        },
        compradorNumeroDocumento: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
            field: "comprador_numero_documento",
        },
        compradorTelefono: {
            type: DataTypes.DECIMAL(10, 0),
            field: "comprador_telefono",
        },
    },
    {
        tableName: "detalles_pagos",
        timestamps: false,
    }
);

// Modelo para la tabla Detalles de Envíos (ShippingDetails)
const ShippingDetails = conn.define(
    "ShippingDetails",
    {
        envioId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "envio_id",
        },
        pedidoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "pedido_id",
        },
        trabajadorId: {
            type: DataTypes.INTEGER,
            field: "trabajador_id",
        },
        envioDireccion: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: "envio_direccion",
        },
        envioCoordenadas: {
            type: DataTypes.STRING(100),
            field: "envio_coordenadas",
        },
        fechaInicio: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "fecha_inicio",
        },
        fechaEntrega: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "fecha_entrega",
        },
        envioValor: {
            type: DataTypes.DECIMAL(10, 0),
            field: "envio_valor",
        },
        envioMensaje: {
            type: DataTypes.TEXT,
            field: "envio_mensaje",
        },
    },
    {
        tableName: "detalles_envios",
        timestamps: false,
    }
);

// Modelo para la tabla Productos y Pedidos (OrderProduct)
const OrderProduct = conn.define(
    "OrderProduct",
    {
        pedidoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "pedido_id",
            primaryKey: true, // Si es parte de la clave primaria compuesta
        },
        productoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "producto_id",
            primaryKey: true, // Clave primaria compuesta
        },
        productoPrecio: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
            field: "producto_precio",
        },
        productoCantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "producto_cantidad",
        },
    },
    {
        tableName: "productos_pedidos",
        timestamps: false,
    }
);

module.exports = { Order, PaymentDetails, ShippingDetails, OrderProduct };
