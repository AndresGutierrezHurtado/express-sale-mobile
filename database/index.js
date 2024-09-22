require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Config
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// Start server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
