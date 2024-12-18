import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Order = sequelize.define(
    "Order",
    {
        order_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        order_status: {
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
        tableName: "orders",
        timestamps: false,
    }
);

const PaymentDetails = sequelize.define(
    "PaymentDetails",
    {
        payment_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        payu_reference: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        payment_amount: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        buyer_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        buyer_email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        buyer_document_type: {
            type: DataTypes.ENUM("CC", "CE", "TI", "PPN", "NIT", "SSN", "EIN"),
            allowNull: false,
            defaultValue: "CC",
        },
        buyer_document_number: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        buyer_phone: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        }
    },
    {
        tableName: "payment_details",
        timestamps: false,
    }
);

const ShippingDetails = sequelize.define(
    "ShippingDetails",
    {
        shipping_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        worker_id: {
            type: DataTypes.UUID,
        },
        shipping_address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        shipping_coordinates: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        shipping_start: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        shipping_end: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        shipping_cost: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        shipping_message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "shipping_details",
        timestamps: false,
    }
);

const OrderProduct = sequelize.define(
    "OrderProduct",
    {
        order_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        product_price: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        product_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "order_products",
        timestamps: false,
    }
);

export { Order, PaymentDetails, ShippingDetails, OrderProduct };

