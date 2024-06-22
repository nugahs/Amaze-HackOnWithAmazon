const historyModel = require("../models/historyModel");

const getUserYearlyHistory = async (req,res) => {
    const email = req.params.email
    const { year} = req.body;

    res.status(201).json({
        success:true,
        message:
            await historyModel.getUserYearlyHistory(email,year)
    })

}

const getUserMonthlyHistory = async (req,res) => {
    const email = req.params.email
    const { month,year} = req.body;

    res.status(201).json({
        success:true,
        message:
            await historyModel.getUserMonthlyHistory(email,month,year)
    })

}

const getUserMonthlyHistoryByTag = async (req,res) => {
    const email = req.params.email
    const { month,year,tag} = req.body;

    res.status(201).json({
        success:true,
        message:
            await historyModel.getUserMonthlyHistoryByTag(email,tag,month,year)
    })

}

const getUserYearlyHistoryByTag = async (req,res) => {
    const email = req.params.email
    const { year,tag} = req.body;

    res.status(201).json({
        success:true,
        message:
            await historyModel.getUserYearlyHistoryByTag(email,tag,year)
    })

}


module.exports = { getUserYearlyHistory,getUserMonthlyHistory,getUserMonthlyHistoryByTag,getUserYearlyHistoryByTag };
