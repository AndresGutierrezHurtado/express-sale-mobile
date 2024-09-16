require('dotenv').config();
const express = require('express');
const app = express();

// Routes
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

app.use('/api', userRoutes);
app.use('/api', productRoutes);

// Start server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
