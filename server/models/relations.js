import { User, Role, Session, Recovery } from "./user.js";
import { Product, Category, Multimedia, Spec } from "./products.js";

// User relations
User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
Role.hasMany(User, { foreignKey: "role_id", as: "users" });

User.hasMany(Session, { foreignKey: "user_id", as: "sessions" });
Session.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(Recovery, { foreignKey: "user_id", as: "recoveries" });
Recovery.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Product relations
Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Category.hasMany(Product, { foreignKey: "category_id", as: "products" });

Product.hasMany(Multimedia, { foreignKey: "product_id", as: "multimedias" });
Multimedia.belongsTo(Product, { foreignKey: "product_id", as: "product" });

Product.hasMany(Spec, { foreignKey: "product_id", as: "specs" });
Spec.belongsTo(Product, { foreignKey: "product_id", as: "product" });

export { User, Role, Session, Recovery, Product, Category, Multimedia, Spec };
