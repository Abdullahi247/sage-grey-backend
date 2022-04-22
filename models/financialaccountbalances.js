const mongoose = require('mongoose')

financialaccountbalanceSchema = new mongoose.Schema({
    account_id : mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    email: String,
    balance: Number
})

module.exports = mongoose.model('financialaccountbalance', financialaccountbalanceSchema)