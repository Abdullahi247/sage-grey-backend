const mongoose = require('mongoose')

const CreateAccountSchema = mongoose.Schema({
    account_id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        max: 15
    },
    lastname: {
        type: String,
        max: 15
    },
    passwoord: String,
    email: String,
    verified: {
        type: Boolean,
        default: false
    }


    //   {
    //     timestamps: true,
    //   }
})



module.exports =  mongoose.model('Sage_Grey_Account', CreateAccountSchema);