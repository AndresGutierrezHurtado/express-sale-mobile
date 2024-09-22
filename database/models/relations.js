// Models
const {
    Order,
    PaymentDetails,
    ShippingDetails,
    OrderProduct,
} = require("./order.model");
const { User, Role, Worker, Recovery } = require("./user.model");
const { Product, Media, Category } = require("./product.model");
const { Rating } = require("./rating.model");

// ------ USER ASSOCIATIONS ----- //

// User to Product: One-to-Many
User.hasMany(Product, {
    foreignKey: "usuario_id",
    as: "products",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Product.belongsTo(User, {
    foreignKey: "usuario_id",
    as: "user",
});

// User to Role: One-to-Many
User.belongsTo(Role, {
    foreignKey: "rol_id",
    as: "role",
});
Role.hasMany(User, {
    foreignKey: "rol_id",
    as: "users",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// User to Recovery: One-to-Many
User.hasMany(Recovery, {
    foreignKey: "usuario_id",
    as: "recovery",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Recovery.belongsTo(User, {
    foreignKey: "usuario_id",
    as: "user",
});

// User to Worker: One-to-One
User.hasOne(Worker, {
    foreignKey: "usuario_id",
    as: "worker",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Worker.belongsTo(User, {
    foreignKey: "usuario_id",
    as: "user",
});

// User to Order: One-to-Many
User.hasMany(Order, {
    foreignKey: "usuario_id",
    as: "orders",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Order.belongsTo(User, {
    foreignKey: "usuario_id",
    as: "user",
});

// User to Rating: Many-to-Many
User.belongsToMany(Rating, {
    through: "calificaciones_usuarios",
    foreignKey: "usuario_id",
    otherKey: "calificacion_id",
    as: "ratings",
});
Rating.belongsToMany(User, {
    through: "calificaciones_usuarios",
    foreignKey: "calificacion_id",
    otherKey: "usuario_id",
    as: "users",
});

// ------ PRODUCT ASSOCIATIONS ----- //

// Product to Category: One-to-Many
Product.belongsTo(Category, {
    foreignKey: "categoria_id",
    as: "category",
});
Category.hasMany(Product, {
    foreignKey: "categoria_id",
    as: "products",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Product to Media: One-to-Many
Product.hasMany(Media, {
    foreignKey: "producto_id",
    as: "media",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Media.belongsTo(Product, {
    foreignKey: "producto_id",
    as: "product",
});

// Product to Rating: Many-to-Many
Product.belongsToMany(Rating, {
    through: "calificaciones_productos",
    foreignKey: "producto_id",
    otherKey: "calificacion_id",
    as: "ratings",
});
Rating.belongsToMany(Product, {
    through: "calificaciones_productos",
    foreignKey: "calificacion_id",
    otherKey: "producto_id",
    as: "products",
});

// ------ ORDER ASSOCIATIONS ----- //

// Order to PaymentDetails: One-to-One
Order.hasOne(PaymentDetails, {
    foreignKey: "pedido_id",
    as: "paymentDetails",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
PaymentDetails.belongsTo(Order, {
    foreignKey: "pedido_id",
    as: "order",
});

// Order to ShippingDetails: One-to-One
Order.hasOne(ShippingDetails, {
    foreignKey: "pedido_id",
    as: "shippingDetails",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
ShippingDetails.belongsTo(Order, {
    foreignKey: "pedido_id",
    as: "order",
});

// Order to OrderProduct: One-to-Many
Order.hasMany(OrderProduct, {
    foreignKey: "pedido_id",
    as: "orderProducts",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
OrderProduct.belongsTo(Order, {
    foreignKey: "pedido_id",
    as: "order",
});

// Worker to ShippingDetails: One-to-Many
Worker.hasMany(ShippingDetails, {
    foreignKey: "trabajador_id",
    as: "shipping",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
ShippingDetails.belongsTo(Worker, {
    foreignKey: "trabajador_id",
    as: "worker",
});

module.exports = {
    Order,
    PaymentDetails,
    ShippingDetails,
    OrderProduct,
    User,
    Role,
    Worker,
    Recovery,
    Product,
    Media,
    Category,
    Rating,
};
