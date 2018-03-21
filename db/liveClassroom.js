const firebase = require('firebase');
const config = require('../server/config.js');
// Add config



firebase.initializeApp(config);
const fb = firebase.database();

/*

JSON Tree
db: {
  classes: {
    1: {
      id: 1
      name: English 101
      teacher: {id: , email: , name: }
      subject: English
      students: {
        id: { 
          name: 'Carlos Ramon',
          isInClassroom: false,
          activeView: 'lobby',
          email: 'cramo@magic.bus',
          quizzes: {} 
        },
      }
    }
  }
}
*/

const endClass = function(classId) {
 
}

//create a top level node ref
// var ref = fb.ref.child('classes')

//create a child node of classes 
  







// Database helpers

module.exports = {
  fb
<<<<<<< HEAD
=======
  //startClass,
>>>>>>> working through merge
}