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

// Read
router.get("/users", async (req, res) => {
    const users = await User.findAll({
        include: ["role", "worker"],
    });
    res.json(users);
});

router.get("/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: [
            "role",
            "worker",
            {
                model: Order,
                as: "orders",
                include: [
                    { model: PaymentDetails, as: "paymentDetails" },
                    { model: ShippingDetails, as: "shippingDetails" },
                    { model: OrderProduct, as: "orderProducts" },
                ],
            },
            { model: Rating, as: "ratings", through: { attributes: [] } },
        ],
    });
    res.json(user);
});

// Create
router.post("/users/:id", async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

// Update
router.put("/users/:id", async (req, res) => {
    const user = await User.update(req.body, {
        where: {
            usuario_id: req.params.id,
        },
    });
    res.json(user);
});

// Delete
router.delete("/users/:id", async (req, res) => {
    const user = await User.destroy({
        where: {
            usuario_id: req.params.id,
        },
    });
    res.json(user);
});

module.exports = router;
