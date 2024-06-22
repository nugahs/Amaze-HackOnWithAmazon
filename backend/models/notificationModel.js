const db = require('../database/db');
const crypto = require('crypto')

const getThresholdPercentageYear = async (email) => {
    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');

    if (users[id].thresholdYear ==0) return 0;
 
    return ((users[id].yearPayment) / (users[id].thresholdYear));
};
const getThresholdPercentageMonth = async (email) => {
    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');

    console.table(users[id]);
    console.log(users[id].thresholdMonth);

    if (users[id].thresholdMonth ==0) return 0;
    return (users[id].monthPayment / users[id].thresholdMonth);
};

const getTagPieDataYear = async (email) => {

    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');

    const year = users[id].currentYear

    const { purchase } = users[id];
    const tagTotals = {};

    purchase.forEach(p => {
        if (p.year == year) {
            if (tagTotals[p.tag]) {
                tagTotals[p.tag] += p.amount;
            } else {
                tagTotals[p.tag] = p.amount;
            }
        }
    });

    console.log(tagTotals);

    const tagTotalsArray = Object.entries(tagTotals).map(([tag, totalAmount]) => ({
        tag,
        totalAmount
    }));

    let data =""
    for(let i=0;i<tagTotalsArray.length;i++) {
        data+="[" + '"' + tagTotalsArray[i].tag + '"'+","+tagTotalsArray[i].totalAmount+"],"
    }
    data = data.slice(0, -1)


    return data;

}


const getTagPieDataMonth = async (email) => {

    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');

    const year = users[id].currentYear
    const month = users[id].currentMonth

    const { purchase } = users[id];
    const tagTotals = {};

    purchase.forEach(p => {
        if (p.year == year && p.month == month) {
            if (tagTotals[p.tag]) {
                tagTotals[p.tag] += p.amount;
            } else {
                tagTotals[p.tag] = p.amount;
            }
        }
    });

    console.log(tagTotals);

    const tagTotalsArray = Object.entries(tagTotals).map(([tag, totalAmount]) => ({
        tag,
        totalAmount
    }));

    let data ="["
    for(let i=0;i<tagTotalsArray.length;i++) {
        "[" + '"' + tagTotalsArray[i].tag + '"'+","+tagTotalsArray[i].totalAmount+"],"
    }
    data = data.slice(0,-1)
    data+=']';

    console.log(data);

    return data;

}

const isYearTriggered = async (email,percentage) => {

    if(percentage == 50) percentage=0;
    if(percentage == 80) percentage=1;
    if(percentage == 100) percentage=2;

    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');

    return users[id].triggersYear[percentage]==1

}

const isMonthTriggered = async (email,percentage) => {

    if(percentage == 50) percentage=0;
    if(percentage == 80) percentage=1;
    if(percentage == 100) percentage=2;

    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');

    return users[id].triggersMonth[percentage]==1

}

const setTriggerYear = async (email,percentage) => {

    if(percentage == 50) percentage=0;
    if(percentage == 80) percentage=1;
    if(percentage == 100) percentage=2;

    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');

    users[id].triggersYear[percentage]=1

    await db.ref(`/users/`).set(users);



}

const setTriggerMonth = async (email,percentage) => {

    if(percentage == 50) percentage=0;
    if(percentage == 80) percentage=1;
    if(percentage == 100) percentage=2;

    const snapshot = await db.ref(`/users/`).once('value');
    let users = snapshot.val();
    const id = crypto.createHash('md5').update(email).digest('hex');

    users[id].triggersMonth[percentage]=1

    await db.ref(`/users/`).set(users);



}



module.exports = { getThresholdPercentageYear, getThresholdPercentageMonth,getTagPieDataYear,getTagPieDataMonth,isMonthTriggered,setTriggerYear,setTriggerMonth };
