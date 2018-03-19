const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const main = require('../db/mainDb.js');
const jwt = require('jsonwebtoken');
const dbMethods = require('../db/mainDb.js');
const config = require('./config.js');
const migration = require('./migrationWorker.js')
// const { fb } = require('../db/liveClassroom.js')

const app = express()

app.use(express.static(__dirname + '/../dist'))
app.use(bodyParser.json())


<<<<<<< HEAD
=======
// app.post('/newAccount', function(req, res){
//   let email = req.body.newAccount.email
//   let password = req.body.newAccount.password
//   let firstName = req.body.newAccount.firstName
//   let lastName = req .body.newAccount.lastName  
//   let userClass = req.body.newAccount.userClass
  
//   console.log('server/index.js - new account -', email, password, firstName, lastName, userClass)  
// })

>>>>>>> SignUp form renders and queries the database
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
  app.post(`/auth/login`, (req, res)=> {
    var email = req.body.email;
    var password = req.body.password;
    dbMethods.verifyUser(email, password)
    .then( (check)=> {
      // this adds the email to our object that we will then add to our store with user info
      check.email = email;
      const newToken = jwt.sign(check, config.jwtSecret);
      if (check) {
        check.token = newToken;
      }
      console.log('check before sending back to server ', check)
      res.send(check)
    })
  
    .catch((err)=> {
      if(err) {
        console.log('err in accessing db when logging in ', err);
      }
    })
  })


// Teacher

  // Start class
  app.post('/startClass', (erq, res) => {
    const { classId } = req.body

    migration.migrateClassToFB(classId)
    .then(()=> {

      // update redux state?

      res.sendStatus(200)
      return
    })
    .catch(() => {
      console.log('Issue starting live class')
      res.sendStatus(500)
    })
  })
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

