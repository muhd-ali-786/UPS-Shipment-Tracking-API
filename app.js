const express = require('express')

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const {render} = require('ejs')
require('dotenv').config()


const trackController = require('./Controller/trackController')
const biReportController = require('./Controller/biReportController')
const shController = require('./Controller/shController')

const app = express()


app.listen(3500, () =>console.log('Server is Running'))





app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use(cookieParser())

app.use(express.json())








app.get('/' , async (req, res)=>{
    res.render('index')
})

app.get('/track/:track_id',trackController.track_test)


app.post('/track/act', trackController.track_activity)
app.get('/bireports', biReportController.dashboard )
app.get('/notifyShOrders', shController.reciever)


app.use((req, res)=>{
    res.status(404).send('Invalid Url')
})

