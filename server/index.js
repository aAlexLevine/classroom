const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const main = require('../db/mainDb.js');
const jwt = require('jsonwebtoken');
const dbMethods = require('../db/mainDb.js');
const config = require('./config.js');
// const { fb } = require('../db/liveClassroom.js')

const app = express()

app.use(express.static(__dirname + '/../dist'))
app.use(bodyParser.json())


// Sign up
<<<<<<< HEAD
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
=======

app.post('/newAccount', (req, res)=> {
  const {firstName, lastName, email, password, userClass} = req.body.newAccount

  main.addUser(firstName, lastName, email, password, userClass)
  .then((data)=> {
    if (data === 'User already exists')
    console.log('user already exits')
    res.sendStatus(403)
>>>>>>> signup form renders and queries postgres
  })
  .catch(err => {
    res.sendStatus(500)
  })
})

<<<<<<< HEAD
// Login
  app.post(`/auth/login`, (req, res)=> {
    var email = req.body.email;
    var password = req.body.password;
    dbMethods.verifyUser(email, password)
    .then( (check)=> {
      check.email = email;
      const newToken = jwt.sign(check, config.jwtSecret);
      if (check) {
        check.token = newToken;
      }
      res.send(check)
    })
  
    .catch((err)=> {
      if(err) {
        console.log('err in accessing db when logging in ', err);
      }
    })
  })
=======
  // Login
  // Specifiy user class in params
>>>>>>> signup form renders and queries postgres


  // Teacher

  // Start class

  // Start Quiz

  // End Class

  // Student

  // Join Class in session

  // Answer Quiz Question

  // Complete Quiz



const port = 3000
app.listen(port, function() {
console.log('Listening on ' + port)
})

