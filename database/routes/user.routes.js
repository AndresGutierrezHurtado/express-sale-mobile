const User = require('../models/user.model');
const router = require('express').Router();

router.get('/users', async (req, res) => {
    const users = await User.findAll({
        include: ['role', 'worker']
    });
    res.json(users);
});

router.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: ['role', 'worker']
    });
    res.json(user);
});

module.exports = router;