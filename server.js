
const express = require('express')
const app = express()
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const express_rate_limit = require('express-rate-limit')
const Sage_Grey_Account = require('./models/createAccount')
const { nanoid }= require('nanoid')
const account = require('./middlewares/accountCreation')
const financialaccountbalance = require('./models/financialaccountbalances')
const deduct = require('./middlewares/interaccount')
const addfund  = require('./middlewares/addfunds')
const recieve = require('./middlewares/receiveacct')
const crypto = require('crypto')
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
// app.use(logger)
app.use(helmet())

var mongoDB = "mongodb+srv://yusufabdullahi:study247@projectscluster2022.czkkt.mongodb.net/ProjectCluster2022?retryWrites=true&w=majority";

mongoose.connect(mongoDB, {
    useNewUrlParser: true
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('connected', console.log.bind(console, "Conncted to MONGODB successfully"))
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/createaccount',  account, (req, res) => {
    // res.send('Done')
} )

app.post('/sendfunds', addfund)

app.post('/interaccountfunds/:recieveraccount/', deduct, recieve, (req,res) => {
res.send(Done)
})


app.listen(3030, console.log("Connected Successfully"))