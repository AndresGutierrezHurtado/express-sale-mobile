import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Modelo para la tabla Pedidos (Order)
const Order = sequelize.define(
    "Order",
    {
        pedido_id: {
            type: DataTypes.STRING(60),
            primaryKey: true,
        },
        usuario_id: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        pedido_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        pedido_estado: {
            type: DataTypes.ENUM(
                "pendiente",
                "enviando",
                "entregado",
                "recibido"
            ),
            allowNull: false,
            defaultValue: "pendiente",
        },
    },
    {
        tableName: "pedidos", // Nombre exacto de la tabla
        timestamps: false,
    }
);

// Modelo para la tabla Detalles de Pagos (PaymentDetails)
const PaymentDetails = sequelize.define(
    "PaymentDetails",
    {
        pago_id: {
            type: DataTypes.STRING(60),
            primaryKey: true,
        },
        pedido_id: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        pago_metodo: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        pago_valor: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        comprador_nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        comprador_correo: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        comprador_tipo_documento: {
            type: DataTypes.ENUM("CC", "CE", "TI", "PPN", "NIT", "SSN", "EIN"),
            allowNull: false,
            defaultValue: "CC",
        },
        comprador_numero_documento: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        comprador_telefono: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        payu_referencia: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    },
    {
        tableName: "detalles_pagos",
        timestamps: false,
    }
);

// Modelo para la tabla Detalles de Envíos (ShippingDetails)
const ShippingDetails = sequelize.define(
    "ShippingDetails",
    {
        envio_id: {
            type: DataTypes.STRING(60),
            primaryKey: true,
        },
        pedido_id: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        trabajador_id: {
            type: DataTypes.STRING(60),
        },
        envio_direccion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        envio_coordenadas: {
            type: DataTypes.STRING(100),
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        fecha_entrega: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        envio_valor: {
            type: DataTypes.DECIMAL(10, 0),
        },
        envio_mensaje: {
            type: DataTypes.TEXT,
        },
    },
    {
        tableName: "detalles_envios",
        timestamps: false,
    }
);

// Modelo para la tabla Productos y Pedidos (OrderProduct)
const OrderProduct = sequelize.define(
    "OrderProduct",
    {
        pedido_id: {
            type: DataTypes.STRING(60),
            allowNull: false,
            primaryKey: true,
        },
        producto_id: {
            type: DataTypes.STRING(60),
            allowNull: false,
            primaryKey: true,
        },
        producto_precio: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        producto_cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "productos_pedidos",
        timestamps: false,
    }
);

export { Order, PaymentDetails, ShippingDetails, OrderProduct };
