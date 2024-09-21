const express = require('express');
const router = express.Router();
const payment = require('../controller/payment');

router.post('/:email',payment.addPayment);

module.exports = router;


