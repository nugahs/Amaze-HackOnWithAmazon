const paymentModel = require("../models/paymentModel");
const notification = require("./notificationTriggger");
const notificationModel = require("../models/notificationModel")

const addPayment = async (req,res) => {
    const { name, amount,saving, img,month,year,tag} = req.body
    const email = req.params.email

    const userPurchase ={
        name,
        amount,
        saving,
        img,
        month,
        year,
        tag
    }
    const response = await paymentModel.addUserPurchase(email,userPurchase)

    const percentageYear = await notificationModel.getThresholdPercentageYear(email)*100

    if(percentageYear>100){

        const req = {
            params: {
                email: email,
                percentage:100
            }
        }

        const res = {
            send:(dummy)=>{}
        };

        await notification.triggerNotificationYear(req,res)


    }else if(percentageYear>80){

        const req = {
            params: {
                email: email,
                percentage:80
            }
        }

        const res = {
            send:(dummy)=>{}
        };

        await notification.triggerNotificationYear(req,res)

    }else if(percentageYear>50){
        const req = {
            params: {
                email: email,
                percentage:50
            }
        }

        const res = {
            send:(dummy)=>{}
        };

        await notification.triggerNotificationYear(req,res)
    }

    const percentageMonth = await notificationModel.getThresholdPercentageMonth(email)*100

    console.log("percentageMonth"+percentageMonth);

    if(percentageMonth>100){

        const req = {
            params: {
                email: email,
                percentage:100
            }
        }

        const res = {
            send:(dummy)=>{}
        };

        await notification.triggerNotificationMonth(req,res)


    }else if(percentageMonth>80){

        const req = {
            params: {
                email: email,
                percentage:80
            }
        }

        const res = {
            send:(dummy)=>{}
        };

        await notification.triggerNotificationMonth(req,res)

    }else if(percentageMonth>50){
        const req = {
            params: {
                email: email,
                percentage:50
            }
        }

        const res = {
            send:(dummy)=>{}
        };

        await notification.triggerNotificationMonth(req,res)
    }

    res.status(201).json({
        success:true,
        message:{
            response
        }
    })

}

module.exports = { addPayment };
