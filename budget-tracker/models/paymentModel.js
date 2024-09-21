const db = require("../database/db");
const crypto = require('crypto')

const addUserPurchase = async (email, userPurchase) => {
    console.log(email);
    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();

    const id = crypto.createHash('md5').update(email).digest('hex');

    if (users[id]) {
        users[id].yearPayment+=parseInt(userPurchase.amount)
        users[id].monthPayment+=parseInt(userPurchase.amount)
        users[id].purchase.push(userPurchase);

    } else {
        const user = {
            email,
            userID:Math.floor(Math.random()*10000)+1,
            thresholdYear: 0,
            thresholdMonth: 0,
            yearPayment: parseInt(userPurchase.amount),
            monthPayment: parseInt(userPurchase.amount),
            currentYear: parseInt(userPurchase.year),
            currentMonth: parseInt(userPurchase.month),
            purchase: [userPurchase],
            triggersMonth:[
                0,0,0
            ],
            triggersYear:[
                0,0,0
            ],
            tags:['fast','most']
        };
        users[id]=user
    }

    await db.ref(`/users/`).set(users);
    return userPurchase;
};

module.exports = { addUserPurchase };
