const budgetModel = require("../models/budgetModel");

const checkUserBudgetThreshold = async (req,res) => {
    const email = req.params.email

    res.status(201).json({
        success:true,
        message:
            await budgetModel.getUserBudgetThreshold(email)
    })

}

const updateUserBudgetThreshold = async (req,res) => {
    const email = req.params.email
    const {year,month} = req.body

    const budget ={
        thresholdYear:year,
        thresholdMonth:month
    }

    console.log(req.body);
    console.log(budget);

    res.status(201).json({
        success:true,
        message:
            await budgetModel.updateUserBudgetThreshold(email,budget)
    })

}

module.exports = { checkUserBudgetThreshold,updateUserBudgetThreshold };
