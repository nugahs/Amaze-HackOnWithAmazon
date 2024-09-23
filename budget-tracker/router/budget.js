const express = require('express');
const router = express.Router();
const budget = require('../controller/budget');

router.get('/threshold/:email',budget.checkUserBudgetThreshold);
router.put('/threshold/:email',budget.updateUserBudgetThreshold);

module.exports = router;


