const mongoose = require('mongoose')
const financialaccountbalance = require('../models/financialaccountbalances')


module.exports= (function (req, res, next) {
    // console.log(req.params.email)
    console.log(req.params)
    const accountmail = req.params.recieveraccount
    financialaccountbalance.findOne({ email: accountmail }, (err, user) => {

        if (err) {
            // res.send("We lost that")
            console.log("We")
            res.sendStatus(400)
        }
        else if (user) {

            const amount = parseInt(user.balance) + parseInt(req.body.amount)

            financialaccountbalance.findOneAndUpdate({ email: accountmail }, { balance: amount }, (err, user) => {

                // console.log(user.balance + 100) 
                // console.log(user) 

            })

            // console.log(amount)
            res.send(`You have successfully sent ${req.body.amount}`)
        }
    })
// next()
})


