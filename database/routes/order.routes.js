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
router.get("/orders", async (req, res) => {
    const orders = await Order.findAll({
        include: [
            { model: PaymentDetails, as: "paymentDetails" },
            { model: User, as: "user" },
            {
                model: ShippingDetails,
                as: "shippingDetails",
                include: { model: Worker, as: "worker", include: {model: User, as: "user"} },
            },
            { model: OrderProduct, as: "orderProducts" },
        ],
    });

    res.json(orders);
});

router.get("/orders/:id", async (req, res) => {
    const orders = await Order.findOne({
        where: {pedido_id: req.params.id},
        include: [
            { model: PaymentDetails, as: "paymentDetails" },
            { model: User, as: "user" },
            {
                model: ShippingDetails,
                as: "shippingDetails",
                include: { model: Worker, as: "worker", include: {model: User, as: "user"} },
            },
            { model: OrderProduct, as: "orderProducts" },
        ],
    });

    res.json(orders);
});

module.exports = router;
