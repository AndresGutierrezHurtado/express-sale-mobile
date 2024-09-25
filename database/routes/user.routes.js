const router = require("express").Router();
require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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

// Auth
router.post("/auth", async (req, res) => {
    const { usuario_correo, usuario_contra } = req.body;

    const user = await User.findOne({
        where: { usuario_correo: usuario_correo },
    });

    if (!user) {
        return res
            .status(401)
            .json({ success: false, message: "Usuario no encontrado" });
    }

    const hashedPassword = crypto
        .createHash("md5")
        .update(usuario_contra)
        .digest("hex");

    if (user.usuario_contra !== hashedPassword) {
        return res
            .status(401)
            .json({ success: false, message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.status(200).json({ success: true, token });
});

module.exports = router;
