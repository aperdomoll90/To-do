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

// connects to the data base

exports.getTasks = (req, res) => {
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
      res.send(ourTask);
    })
    .catch((err) => res.status(500).send('error getting task: ' + err.message));
};

exports.createTask = (req, res) => {
  connectToFirestore();
  //new task comes in request body
  const newTask = req.body
  //add to the database
  db.collection('task').add(newTask)
  .then(() => this.getTasks(req,res))
  .catch(err => response.status(500).send('error creating task: ' + err.message))
  
};
