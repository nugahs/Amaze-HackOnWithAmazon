const db = require('../database/db');
const crypto = require('crypto')

const getUserBudgetThreshold = async (email) => {

    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');
    
    const budget ={
        year:users[id].thresholdYear,
        month:users[id].thresholdMonth
    }

    return budget;
};

const updateUserBudgetThreshold = async (email,budget) => {

    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');


    users[id].thresholdYear=parseInt(budget.thresholdYear)
    users[id].thresholdMonth=parseInt(budget.thresholdMonth)


    await db.ref(`/users/`).set(users);
    return budget;
};

module.exports = { getUserBudgetThreshold,updateUserBudgetThreshold };
