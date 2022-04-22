const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const Sage_Grey_Account = require('../models/createAccount')
const financialaccountbalance = require('../models/financialaccountbalances')


module.exports = (function (req, res, next) {
    ///hash password
    var hashPassword = bcrypt.hashSync(req.body.password, 11, (err, hash) => {
        if (err) {
            return err
        }
        else {
            return hash
        }
    })
    const newAccount = new Sage_Grey_Account({
        account_id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        passwoord: hashPassword,
        email: req.body.email,
        verified: false
    })
    const newFinancialaccountbalance = new financialaccountbalance({
        account_id: newAccount.account_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        balance: 0
    })

    ////existence customer checker
    Sage_Grey_Account.findOne({ email: req.body.email }, (err, account) => {
        if (err) {
            return err
        }
        else if (account) {
            res.send(`This account ${req.body.email} is already registered please login`)
        }
        else {

            newAccount.save()
                .then((result) => {

                    ///implimentation of mailling service

                    // var transporter = nodemailer.createTransport(nodemailerSgTransporter({
                    //     auth: {
                    //         // api_user: "test",
                    //         api_key: "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"
                    //     }
                    // }))

                    // var usermail = req.body.email
                    // var customerToken = userToken.accountToken
                    // ///Automatically send email to any registered user
                    // var mailopt = {
                    //     from: "tsmart247@gmail.com",
                    //     to: "abdullahi.yusuf.171102@fuoye.edu.ng",
                    //     // to: "tsmart247@gmail.com",
                    //     subject: "Account verifyy",
                    //     text: "Hi Hello",
                    //     html: `<div>
                    //         <h3>Verify you Sage-Grey Account</h3>
                    //         <p>
                    //             Please Click on the link below to verifychcbvjvnjdfv
                    //         </p>
                    //         <a href='http://localhost:3044/verify/${usermail}/account/${customerToken}'>Verify</a>
                    //     </div>`
                    // }
                    // transporter.sendMail(
                    //     //     
                    //     mailopt
                    //     // emailformat
                    //     ,
                    //     function (err) {
                    //         if (err) {
                    //             console.log(err)
                    //         } else {
                    //             console.log("Message Sent")
                    //         }
                    //     })
                    // console.log("Saved")
                    return result
                })
                .catch((err) => {
                    res.status(400).send(err)
                })
            newFinancialaccountbalance.save()
                .then((result) => {
                    return 
                })
                .catch((err) => {
                    return err
                })
            res.send("Account Registered")

        }
    }
    )

    next()
})