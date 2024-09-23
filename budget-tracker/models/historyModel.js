const db = require("../database/db");
const crypto = require('crypto')

const getUserYearlyHistory = async (email, year) => {

    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');

    const { purchase } = users[id];
    return purchase.filter(p => p.year === year);
};

const getUserMonthlyHistory = async (email, month, year) => {

    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');

    const { purchase } = users[id];
    return purchase.filter(p => ((p.year === year) && (p.month === month)));
};

const getUserMonthlyHistoryByTag = async (email,tag, month, year) => {

    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');

    const { purchase } = users[id];
    return purchase.filter(p => ((p.year === year) && (p.month === month) && (p.tag === tag)));
};
const getUserYearlyHistoryByTag = async (email,tag, year) => {

    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');

    const { purchase } = users[id];
    return purchase.filter(p => ((p.year === year)  && (p.tag === tag)));
};


module.exports = { getUserYearlyHistory, getUserMonthlyHistory,getUserMonthlyHistoryByTag,getUserYearlyHistoryByTag };
