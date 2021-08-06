var express = require('express');
var router = express.Router();

const productRoutes = require('./product.route')

router.use('/product', productRoutes)

module.exports = router;
