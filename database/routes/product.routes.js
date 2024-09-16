const Product = require('../models/product.model');
const router = require('express').Router();

router.get('/products', async (req, res) => {
    const products = await Product.findAll({
        include: ['category', 'user']
    });
    res.json(products);
});

router.get('/products/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id, {
        include: ['category', 'user']
    });
    res.json(product);
});

module.exports = router;