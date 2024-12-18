// Models
<<<<<<<< HEAD:server/models/relations.js
import { User, Role, Worker, Recovery, Session, Cart, Withdrawal } from "./user.model.js";
import { Product, Media, Category } from "./product.model.js";
import { Order, PaymentDetails, ShippingDetails, OrderProduct } from "./order.model.js";
import { Rating, ProductsCalifications, UsersCalifications } from "./rating.model.js";
========
import { User, Role, Worker, Recovery, Session, Cart, Withdrawal } from "./user.js";
import { Product, Media, Category } from "./product.js";
import { Order, PaymentDetails, ShippingDetails, OrderProduct } from "./order.js";
import { Rating, ProductsCalifications, UsersCalifications } from "./rating.js";
>>>>>>>> develop:server/src/models/index.js

// ------ USER ASSOCIATIONS ----- //

// User to Product: One-to-Many
User.hasMany(Product, {
    foreignKey: "user_id",
    as: "products",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Product.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// User to Role: One-to-Many
User.belongsTo(Role, {
    foreignKey: "role_id",
    as: "role",
});
Role.hasMany(User, {
    foreignKey: "role_id",
    as: "users",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// User to Recovery: One-to-Many
User.hasMany(Recovery, {
    foreignKey: "user_id",
    as: "recovery",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Recovery.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// User to Worker: One-to-One
User.hasOne(Worker, {
    foreignKey: "user_id",
    as: "worker",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Worker.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// User to Order: One-to-Many
User.hasMany(Order, {
    foreignKey: "user_id",
    as: "orders",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Order.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// User to Rating: Many-to-Many
User.belongsToMany(Rating, {
    through: UsersCalifications,
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "usuario_id",
    otherKey: "calificacion_id",
========
    foreignKey: "user_id",
    otherKey: "rating_id",
>>>>>>>> develop:server/src/models/index.js
    as: "ratings",
});
Rating.belongsToMany(User, {
    through: UsersCalifications,
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "calificacion_id",
    otherKey: "usuario_id",
========
    foreignKey: "rating_id",
    otherKey: "user_id",
>>>>>>>> develop:server/src/models/index.js
    as: "users",
});

// User to Rating: One-to-Many
User.hasMany(Rating, {
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "usuario_id",
========
    foreignKey: "user_id",
>>>>>>>> develop:server/src/models/index.js
    as: "califications",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Rating.belongsTo(User, {
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "usuario_id",
========
    foreignKey: "user_id",
>>>>>>>> develop:server/src/models/index.js
    as: "calificator",
});

// Worker to Withdraw: One-to-Many
Worker.hasMany(Withdrawal, {
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "trabajador_id",
========
    foreignKey: "worker_id",
>>>>>>>> develop:server/src/models/index.js
    as: "withdrawals",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Withdrawal.belongsTo(Worker, {
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "trabajador_id",
========
    foreignKey: "worker_id",
>>>>>>>> develop:server/src/models/index.js
    as: "worker",
});

// User to Cart: One-to-Many
User.hasMany(Cart, {
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "usuario_id",
========
    foreignKey: "user_id",
>>>>>>>> develop:server/src/models/index.js
    as: "carts",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Cart.belongsTo(User, {
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "usuario_id",
========
    foreignKey: "user_id",
>>>>>>>> develop:server/src/models/index.js
    as: "user",
});

// Product to Cart: One-to-Many
Product.hasMany(Cart, {
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "producto_id",
========
    foreignKey: "product_id",
>>>>>>>> develop:server/src/models/index.js
    as: "carts",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Cart.belongsTo(Product, {
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "producto_id",
========
    foreignKey: "product_id",
>>>>>>>> develop:server/src/models/index.js
    as: "product",
});

// ------ PRODUCT ASSOCIATIONS ----- //

// Product to Category: One-to-Many
Product.belongsTo(Category, {
    foreignKey: "category_id",
    as: "category",
});
Category.hasMany(Product, {
    foreignKey: "category_id",
    as: "products",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Product to Media: One-to-Many
Product.hasMany(Media, {
    foreignKey: "product_id",
    as: "media",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Media.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
});

// Product to Rating: Many-to-Many
Product.belongsToMany(Rating, {
    through: ProductsCalifications,
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "producto_id",
    otherKey: "calificacion_id",
========
    foreignKey: "product_id",
    otherKey: "rating_id",
>>>>>>>> develop:server/src/models/index.js
    as: "ratings",
});
Rating.belongsToMany(Product, {
    through: ProductsCalifications,
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "calificacion_id",
    otherKey: "producto_id",
========
    foreignKey: "rating_id",
    otherKey: "product_id",
>>>>>>>> develop:server/src/models/index.js
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

// OrderProduct to Product: Many-to-One
OrderProduct.belongsTo(Product, {
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "producto_id",
    as: "product",
});
Product.hasMany(OrderProduct, {
    foreignKey: "producto_id",
========
    foreignKey: "product_id",
    as: "product",
});
Product.hasMany(OrderProduct, {
    foreignKey: "product_id",
>>>>>>>> develop:server/src/models/index.js
    as: "orderProducts",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Worker to ShippingDetails: One-to-Many
Worker.hasMany(ShippingDetails, {
<<<<<<<< HEAD:server/models/relations.js
    foreignKey: "trabajador_id",
========
    foreignKey: "worker_id",
>>>>>>>> develop:server/src/models/index.js
    as: "shippings",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
ShippingDetails.belongsTo(Worker, {
    foreignKey: "worker_id",
    as: "worker",
});

export {
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
    UsersCalifications,
    ProductsCalifications,
    Session,
    Cart,
    Withdrawal,
};
