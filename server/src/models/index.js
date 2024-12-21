// Models
import { User, Role, Worker, Recovery, Session, Cart, Withdrawal } from "./user.js";
import { Order, PaymentDetails, ShippingDetails, OrderProduct } from "./order.js";
import { Rating, ProductsCalifications, UsersCalifications } from "./rating.js";
import { Product, Media, Category } from "./product.js";

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
    foreignKey: "user_id",
    otherKey: "rating_id",
    as: "ratings",
});
Rating.belongsToMany(User, {
    through: UsersCalifications,
    foreignKey: "rating_id",
    otherKey: "user_id",
    as: "users",
});

// User to Rating: One-to-Many
User.hasMany(Rating, {
    foreignKey: "user_id",
    as: "califications",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Rating.belongsTo(User, {
    foreignKey: "user_id",
    as: "calificator",
});

// Worker to Withdraw: One-to-Many
Worker.hasMany(Withdrawal, {
    foreignKey: "worker_id",
    as: "withdrawals",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Withdrawal.belongsTo(Worker, {
    foreignKey: "worker_id",
    as: "worker",
});

// User to Cart: One-to-Many
User.hasMany(Cart, {
    foreignKey: "user_id",
    as: "carts",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Cart.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// Product to Cart: One-to-Many
Product.hasMany(Cart, {
    foreignKey: "product_id",
    as: "carts",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Cart.belongsTo(Product, {
    foreignKey: "product_id",
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
    as: "medias",
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
    foreignKey: "product_id",
    otherKey: "rating_id",
    as: "ratings",
});
Rating.belongsToMany(Product, {
    through: ProductsCalifications,
    foreignKey: "rating_id",
    otherKey: "product_id",
    as: "products",
});

// ------ ORDER ASSOCIATIONS ----- //

// Order to PaymentDetails: One-to-One
Order.hasOne(PaymentDetails, {
    foreignKey: "order_id",
    as: "paymentDetails",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
PaymentDetails.belongsTo(Order, {
    foreignKey: "order_id",
    as: "order",
});

// Order to ShippingDetails: One-to-One
Order.hasOne(ShippingDetails, {
    foreignKey: "order_id",
    as: "shippingDetails",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
ShippingDetails.belongsTo(Order, {
    foreignKey: "order_id",
    as: "order",
});

// Order to OrderProduct: One-to-Many
Order.hasMany(OrderProduct, {
    foreignKey: "order_id",
    as: "orderProducts",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
OrderProduct.belongsTo(Order, {
    foreignKey: "order_id",
    as: "order",
});

// OrderProduct to Product: Many-to-One
OrderProduct.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
});
Product.hasMany(OrderProduct, {
    foreignKey: "product_id",
    as: "product",
});
Product.hasMany(OrderProduct, {
    foreignKey: "product_id",
    as: "orderProducts",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Worker to ShippingDetails: One-to-Many
Worker.hasMany(ShippingDetails, {
    foreignKey: "worker_id",
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
