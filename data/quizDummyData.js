let  classRoom= { '25': 
   { name: 'Magic Class',
     subject: 'Magic',
     teacher: { 
        id: 58, 
        name: 'Valerie Frizzle', 
        email: 'mfrizz@magic.bus' 
      },
     activeView: 12,
     quizzes: {
		'12': {
		  id: 12,
		  classId: 1,
		  subject: 'History',
		  name: 'This is the Quiz',
		  endTime: 1521672378691,
		  questions: {
			1: {
			  position: 1,
			  text: 'This is a question',
			  answers: {
				1: {text: 'this is an answer', isCorrect: true},
				2: {text: 'this is an answer', isCorrect: false},
				3: {text: 'this is an answer', isCorrect: false},
				4: {text: 'this is an answer', isCorrect: false}
			  }
			}, 
			2: {
			  position: 2,
			  text: 'This is another question',
			  answers: {
				1: {text: 'this is an answer', isCorrect: false},
				2: {text: 'this is an answer', isCorrect: false},
				3: {text: 'this is an answer', isCorrect: true}
			  }
        	}
      }
    }
	 },
	 students: { 
  '37': 
   { name: 'Carlos Ramon',
     isInClassroom: false,
     activeView: 'lobby',
     email: 'cramo@magic.bus',
     quizzes: {
      12 : {
          id: 12,
          isFinished: false,
          responses: {
            1: {
              id: 1,
              time: 60000,
              answers: {
               1: false,
               2: false,
               3: false,
               4: false
              }
             },
             2: {
               id: 2,
               time: 60000,
               answers: {
                1: false,
                2: false,
                3: false,
              }
             }
           },
           currentQuestion: 2,
         } 
       }
     },
  '38': 
   { name: 'Keesha, Franklin',
     isInClassroom: false,
     activeView: 'lobby',
     email: 'kfrank@magic.bus',
     quizzes: {
      12 : {
          id: 12,
          isFinished: false,
          responses: {
            1: {
              id: 1,
              time: 60000,
              answers: {
               1: false,
               2: false,
               3: false,
               4: false
              }
             },
             2: {
               id: 2,
               time: 60000,
               answers: {
                1: false,
                2: false,
                3: false,
              }
             }
           },
           currentQuestion: 2,
         } 
       }
    },
  '39': 
   { name: 'Dorothy Rourke',
     isInClassroom: false,
     activeView: 'lobby',
     email: 'drour@magic.bus',
    quizzes: {
      12 : {
          id: 12,
          isFinished: false,
          responses: {
            1: {
              id: 1,
              time: 60000,
              answers: {
               1: false,
               2: false,
               3: false,
               4: false
              }
             },
             2: {
               id: 2,
               time: 60000,
               answers: {
                1: false,
                2: false,
                3: false,
              }
             }
           },
           currentQuestion: 2,
         } 
       }
     },
  '40': 
   { name: 'Arnold Perlstein',
     isInClassroom: false,
     activeView: 'lobby',
     email: 'aperl@magic.bus',
     quizzes: {
      12 : {
          id: 12,
          isFinished: false,
          responses: {
            1: {
              id: 1,
              time: 60000,
              answers: {
               1: false,
               2: false,
               3: false,
               4: false
              }
             },
             2: {
               id: 2,
               time: 60000,
               answers: {
                1: false,
                2: false,
                3: false,
              }
             }
           },
           currentQuestion: 2,
         } 
       }
     } 
    }
  }
}

const quiz = {
  id: 12,
  classId: 1,
  subject: 'History',
  name: 'This is the Quiz',
  endTime: 1521672378691,
  questions: {
    1: {
      position: 1,
      text: 'This is a question',
      answers: {
        1: {text: 'this is an answer', isCorrect: true},
        2: {text: 'this is an answer', isCorrect: false},
        3: {text: 'this is an answer', isCorrect: false},
        4: {text: 'this is an answer', isCorrect: false}
      }
    }, 
    2: {
      position: 2,
      text: 'This is another question',
      answers: {
        1: {text: 'this is an answer', isCorrect: false},
        2: {text: 'this is an answer', isCorrect: false},
        3: {text: 'this is an answer', isCorrect: true}
      }
    }
  }
}
 


module.exports.classRoom = classRoom
module.exports.quiz = quiz

// const dummyResponse = {
//   // 1 = quiz ID
//   1 : {
//       responses: {
//           // 2 = question ID
//           1: {
//               time: 2,
//               answers: {
//                   1: false,
//                   2: true,
//                   3: false,
//                   4: false
//               },
//           2: {
//               time: 2,
//               answers: {
//                   1: true,
//                   2: false,
//                   3: false,
//                   4: false
//               }

//           }
//       }
//   },
//   currentQuestion: 2
//   }
// }
