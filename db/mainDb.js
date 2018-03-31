const { Pool } = require('pg')
const schema = require('./classroom.js')
const bcrypt = require('bcrypt')

const connectionString = process.env.DATABASE_URL || 'postgres:postgress//localhost:5432/classroom';

const db = new Pool({
  user: process.env.USER,
  database: 'classroom',
  host: 'localhost',
  password: null,
  port: 5432,
})

db.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
})

db.connect().then((client)=> {
  return client.query(schema)
  .then(res => {
    client.release()
    console.log('created classroom database')
  })
  .catch(err => {
    client.release()
    console.log('oops!', err.stack)
  })
})

// Database helpers

const addUser = function(firstName, lastName, email, password, userClass) {
  let userclass = userClass === 'teacher' ? 'teachers' : 'students'

  const salt = 10;
  return bcrypt.hash(password, salt)
    .then((hash)=> {
      
      var client
      
      return db.connect().then(newClient => {
        client = newClient

        return client.query(`SELECT * FROM ${userclass} WHERE email=$1`, [email])
        .then(res => {
          if (res.rowCount) {
            return 'User already exists'
          } else {
            return client.query(
              `INSERT INTO ${userclass} (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`, 
              [firstName, lastName, email, hash]
            )
          }
        })
      })
      .then(output => {
        client.release()
        return output
      })
    })
    .catch((err) => {
      console.log('Issue with password hashing', err)
    })
}

const verifyUser = function(email, password) {

  // Check if user is a teacher
  return db.query(`SELECT * FROM teachers WHERE email=$1`, [email])
  .then((teacherSearch) => {
    if (teacherSearch.rowCount > 0) {
      return {class: 'teacher', user: teacherSearch}
    } else {

  // Check if user is a student
     return db.query(`SELECT * FROM students WHERE email=$1`, [email])
      .then((studentSearch) => {
        if (studentSearch.rowCount > 0) {
          return {class: 'student', user: studentSearch}
        } else {
          return null
        }
      })
    }
  })
  .then((res)=> {
    if (res) {
      let user = res.user.rows[0]
      
    return bcrypt.compare(password, user.password)
      .then(auth => {
        if (auth) {
          return {class: res.class, id: user.id}
        } else {
          return false
        }
      })
    } else {
      return false
    }
  })
}

const fetchClass = function(classId) {
  return db.query(`
  SELECT classes.id, classes.name, teachers.first_name, teachers.last_name, teachers.email, teachers.id as teacher_id, subjects.name as subject 
  FROM classes, teachers, subjects WHERE classes.id=$1;`, [classId])
  .then(res => {
    return res.rows
  })
  .catch(err => {
    console.log('Issue fetching class from MainDb', err)
  })
}

const fetchQuizTemplates = function(teacherId) {
  return db.query(
    `SELECT * FROM draft_quizzes WHERE teacher_id=$1`, [teacherId]
  )
  .then(quizzes => {
    return Promise.all(quizzes.rows.map(quiz => {
      db.query(`SELECT * FROM draft_quizzes_draft_questions INNER JOIN draft_questions .id ON draft_quizzes_draft_questions.draft_question_id WHERE draft_quizzes_draft_questions.draft_quiz_id=$1`, [quiz.id])
    }))
  })
}

/**************** INSERTING CLASS INTO POSTGRESQL ****************/
const addNewClass = function(classObj) {
  //console.log('database side', classObj)
  //const params = []
  const checkSubjectQuery = `SELECT * FROM subjects WHERE name='${classObj.subject}';`
  return db.query(checkSubjectQuery)
  .then((count) => {
    console.log('count', count);
    if (count.rowCount === 0) {
      return db.query(`INSERT INTO subjects (name) VALUES ('${classObj.subject}')`)
    }
  })
  .then(() => {
    const queryString = `INSERT INTO classes (name, teacher_id, subject_id, year, quarter, thunmbnail)
                       VALUES ('${classObj.classname}', (SELECT id FROM teachers WHERE email='${classObj.email}'),
                       (SELECT id FROM subjects WHERE name='${classObj.subject}'), '${classObj.year}', '${classObj.quarter}', '${classObj.thumbnail}')`
    //console.log(queryString);
    return db.query(queryString)
  })
  .catch((err)=> console.log(err))
  
}

const getNewAddedClass = function(email, classname) {
  console.log('email', email, 'classname', classname)
  const teacherIdqueryString = `SELECT id FROM teachers WHERE email='${email}'`;
  return db.query(teacherIdqueryString)
  .then((data) => {
    const teacherId = data.rows[0].id;
    const queryStringForClasses = `SELECT * FROM classes WHERE teacher_id='${teacherId}' AND name='${classname}';`
    return db.query(queryStringForClasses)
    console.log('teacher id data', data.rows[0].id);
  })
}

const getClassesForTeacherMainView = function(email) {
  const teacherIdqueryString = `SELECT id FROM teachers WHERE email='${email}'`;
  return db.query(teacherIdqueryString)
  .then((data) => {
    const teacherId = data.rows[0].id;
    const queryStringForClasses = 
    `SELECT classes.id as id, subjects.id as subject_id, teachers.id as teacher_id, classes.name, 
    teachers.first_name, teachers.last_name, classes.thunmbnail, classes.year, classes.quarter 
    FROM classes INNER JOIN teachers ON classes.teacher_id = teachers.id 
    INNER JOIN subjects ON subjects.id = classes.subject_id WHERE teacher_id='${teacherId}';`
    return db.query(queryStringForClasses)
    .then(classes => {
      return classes.rows.map(eachClass => {
        eachClass.teacher = eachClass.first_name + ' ' + eachClass.last_name
        return eachClass
      })
    })
  })
}

const getAllStudents = function() {
  const queryString= `SELECT * FROM students`;
  return db.query(queryString)
}

const getAllStudentsBelongToAClass = function(classId) {
  const queryString = 
  `SELECT students.id, students.first_name, students.last_name, students.email
  FROM students INNER JOIN classes_students ON students.id = classes_students.student_id
  WHERE classes_students.class_id='${classId}'`
  return db.query(queryString);
}

const addStudentToAClass= function(classId, studentId) {
  const queryString = 
  `INSERT INTO classes_students (class_id, student_id) VALUES ('${classId}', '${studentId}');`
  return db.query(queryString)
  .then(() => {
    console.log('class Id to fetch student', classId)
    return getAllStudentsBelongToAClass(classId)
  })
}

const getClassesBelongToAStudent = function(studentEmail) {
  const studentIdQueryString = `SELECT id FROM students WHERE email='${studentEmail}';`
  return db.query(studentIdQueryString)
  .then((data) => {
    const studentId = data.rows[0].id;
    const queryStringForClasses = `SELECT * FROM classes INNER JOIN classes_students 
                                   ON classes.id = classes_students.class_id 
                                   WHERE classes_students.student_id='${studentId}';`
    return db.query(queryStringForClasses);
  })
}

const getAllExistingSubjects = function() {
  const queryString = `SELECT * FROM subjects`;
  return db.query(queryString);
}

const addQuiz = function(quizObj) {
  const teacherId = quizObj.authorId;
  const questions = quizObj.quiz.questions;
  const quizName = quizObj.quiz.name;
  const subjectId = quizObj.quiz.subject.sub.id;
  const subjectName = quizObj.quiz.subject.sub.name;
  let quizId 
  return db.query(`INSERT INTO draft_quizzes (name, subject_id, teacher_id) VALUES ('${quizName}', '${subjectId}', '${teacherId}') RETURNING *;`)
  .then((data) => {
    quizId = data.rows[0].id
    return quizId
  })
  .then((data) => {
    return Promise.all(questions.map((each, index) => {
      return db.query(`INSERT INTO draft_questions (question, teacher_id, subject_id) VALUES ('${each.question}', '${teacherId}', '${subjectId}') RETURNING *;`)
      .then((data) => {
        each.id = data.rows[0].id
        return each
      })  
    }))
  })
  .then(() => {
    return Promise.all(questions.map((each, index) => {
      console.log('each questions with id to join table', each) //at this point we have the questions with id
      return db.query(`INSERT INTO draft_quizzes_draft_questions (draft_quiz_id, draft_question_id, position) 
                VALUES ('${quizId}', '${each.id}', '${index}');`) 
      .then(() => {
        return each
      })
    }))
  })
  .then((data) => {
    // console.log('dataaaaaa after draft_quizzes_draft_questions', data)
    return Promise.all((data.map((q, i) => {
      return Promise.all(q.answers.map((answer, j) => {
        return db.query(`INSERT INTO draft_answers (answer, question_id, correct) VALUES
                ('${answer.text}', '${q.id}', '${answer.isCorrect}');`) 
      }))
    })))
  })
  .then(() => {
    return getQuizzes(teacherId, subjectId)
  })
  .catch((err) => {
    if (err) throw err;
  })
}

const getQuizzes = function(teacherId, subjectId) {
  // console.log('teacherId, subjectId ------> ', teacherId, subjectId)
  return db.query(`SELECT draft_quizzes.name, draft_quizzes.id, subjects.name as subject FROM draft_quizzes INNER JOIN subjects ON draft_quizzes.subject_id = subjects.id WHERE teacher_id='${teacherId}' AND subject_id='${subjectId}'`)
  .then((data) => {
    const quizzes = data.rows.map((quiz) => {
      return {
        name: quiz.name,
        id: quiz.id,
        subject: quiz.subject
      }
    })
    return quizzes;
  })
  .then((data) => {
    return Promise.all(data.map((eachQuiz, index) => {
        return db.query(`SELECT * FROM draft_questions INNER JOIN draft_quizzes_draft_questions
                       ON draft_questions.id = draft_quizzes_draft_questions.draft_question_id 
                       AND draft_quizzes_draft_questions.draft_quiz_id = '${eachQuiz.id}'`)
        .then((questions) => {
          eachQuiz.questions = {}

          questions.rows.forEach(question=> {
            let formattedQuestion = {}
            formattedQuestion.id = question.id
            formattedQuestion.text = question.question
            formattedQuestion.position = question.position
            formattedQuestion.draft_question_id = question.draft_question_id

            eachQuiz.questions[question.id] = formattedQuestion
          })
          return eachQuiz
        })
      }))
  })
  .then((data) => {
    return Promise.all(data.map((eachQuiz) => {
      return Promise.all(Object.keys(eachQuiz.questions).map((eachQuestionId) => {
        let eachQuestion = eachQuiz.questions[eachQuestionId]
        return db.query(`SELECT * FROM draft_answers WHERE question_id = '${eachQuestion.draft_question_id}'`)
        .then((answers) => {
          eachQuestion.answers = {}

          answers.rows.forEach(answer=> {
            let formattedAnswer = {}
            formattedAnswer.id = answer.id
            formattedAnswer.text = answer.answer
            formattedAnswer.isCorrect = answer.correct

            eachQuestion.answers[answer.id] = formattedAnswer
          })
          return eachQuestion
        })
      }))
      .then((questions) => {
        eachQuiz.questions = questions
        return eachQuiz
      })
    }))
  })
}

module.exports = {
  addUser,
  verifyUser,
  fetchClass,
  db,
  addNewClass,
  getClassesForTeacherMainView,
  getAllStudents,
  getAllStudentsBelongToAClass,
  addStudentToAClass,
  getClassesBelongToAStudent,
  getAllExistingSubjects,
  addQuiz,
  getQuizzes,
  getNewAddedClass
}

