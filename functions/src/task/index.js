const { response } = require('express');
const admin = require('firebase-admin');

const serviceAccount = require('../../credentials.json');

let db;

function connectToFirestore() {
  if (!db) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    db = admin.firestore();
  }
}

exports.returnTasks = (callback) => {
  connectToFirestore();

  db.collection('task')
    .get()
    .then((collection) => {
      let ourTask = [];
      collection.forEach((doc) => {
        let thisTask = doc.data();
        thisTask.id = doc.id;
        ourTask.push(thisTask);
      });
      callback(ourTask)
    })
    .catch((err) => {callback( 'error getting task: ' + err.message)});
}




exports.getTasks = (req, res) => {
  connectToFirestore();
  this.returnTasks(ourTask =>{ 
const status = (ourTask.beginsWith('error')) ? 500 :200
      res.set('Cache-Control', 'public, max-age=90, s-maxage=120')
      res.status(status).send(ourTask);
      })
}

exports.createTask = (req, res) => {
  connectToFirestore();
 
  const newTask = req.body
  db.collection('task').add(newTask)
  .then(() => {
    this.returnTasks(ourTask =>{ res.send(ourTask)})
  })
  .catch(err => response.status(500).send('error creating task: ' + err.message))
  
};


