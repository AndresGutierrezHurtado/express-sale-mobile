const router = require("express").Router();

// Models
const {
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
} = require("../models/relations");

// read
router.get("/products", async (req, res) => {
    const products = await Product.findAll({
        include: [
            "category",
            { model: User, as: "user", include: ["worker"] },
            { model: Rating, as: "ratings", through: { attributes: [] } },
        ],
    });
    res.json(products);
});

router.get("/products/:id", async (req, res) => {
    const product = await Product.findByPk(req.params.id, {
        include: [
            "category",
            { model: User, as: "user", include: ["worker"] },
            { model: Rating, as: "ratings", through: { attributes: [] } },
        ],
    });
    res.json(product);
});

// create
router.post("/products/:id", async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
});

// update
router.put("/products/:id", async (req, res) => {
    const product = await Product.update(req.body, {
        where: {
            producto_id: req.params.id,
        },
    });
    res.json(product);
});

// delete
router.delete("/products/:id", async (req, res) => {
    const product = await Product.destroy({
        where: {
            producto_id: req.params.id,
        },
    });
    res.json(product);
});

module.exports = router;
