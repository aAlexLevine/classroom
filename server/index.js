const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const main = require('../db/mainDb.js')
// const { fb } = require('../db/liveClassroom.js')

const app = express()

app.use(express.static(__dirname + '/../dist'))
app.use(bodyParser.json())

// Sign up

app.post('/newAccount', (req, res)=> {
  const {firstName, lastName, email, password, userClass} = req.body.newAccount

  main.addUser(firstName, lastName, email, password, userClass)
  .then((data)=> {
    if (data === 'User already exists')
    console.log('user already exits')
    res.sendStatus(403)
  })
  .catch(err => {
    res.sendStatus(500)
  })
})

  // Login
  // Specifiy user class in params


  // Teacher

  // Start class

  // Start Quiz

  // End Class

  // Student

  // Join Class in session

  // Answer Quiz Question

  app.post('/answer', (req, res) => {
    let answer = req.body.answer
    console.log('answer submitted', answer)
  })

  // Complete Quiz



const port = 3000
app.listen(port, function() {
console.log('Listening on ' + port)
})

