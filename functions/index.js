const functions = require("firebase-functions");
const express = require('express')
const {getTasks, createTask } = require('./src/task')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/task',getTasks)
app.post('/task',createTask)


exports.app = functions.https.onRequest(app)
//to Rout all requests to app
