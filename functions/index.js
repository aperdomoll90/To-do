const functions = require("firebase-functions");
const express = require('express')
const {getTasks, createTask, returnTasks } = require('./src/task')
const cors = require('cors');
const engines =require("consolidate")

const app = express()
app.use(cors())

app.engine('hbs',engines.handlebars)
app.set('views','./views')
app.set('view engine', 'hbs')


app.get('/task',getTasks)
app.post('/task',createTask)



app.get('/',(req,res)=>{
returnTasks(ourTask =>{
    console.log(ourTask)
    res.render('index', {ourTask})
})
})


exports.app = functions.https.onRequest(app)
//to Rout all requests to app
