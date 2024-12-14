import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
});

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

export default sequelize;
