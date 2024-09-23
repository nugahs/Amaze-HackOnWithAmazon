const express = require('express');
const router = express.Router();
const history = require('../controller/history');

router.post('/year/:email',history.getUserYearlyHistory);
router.post('/month/:email',history.getUserMonthlyHistory);
router.post('/year/:email/tag',history.getUserYearlyHistoryByTag);
router.post('/month/:email/tag',history.getUserMonthlyHistoryByTag);

module.exports = router;


