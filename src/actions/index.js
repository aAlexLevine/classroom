import axios from 'axios';  
import { browserHistory } from 'react-router';  
import actionTypes from './types';
import classes from '../../data/teacherClassViewData.js';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { fb } from '../../db/liveClassroom.js';
import studentQuizObjConverter from '../utils/studentQuizObjConverter.js';
//import fb from '../../db/liveClassroom.js'

const serverURL = 'http://localhost:3000';

export function setCurrentUser (user) {
    return {
        type: actionTypes.SET_CURRENT_USER,
		user: user
    }
}

export function loginUser({ email, password }) {  
    return function(dispatch) {
      axios.post(`${serverURL}/auth/login`, { email, password })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('jwtToken ', token);
        setAuthorizationToken(token);
		const decoded = jwt.decode(token)
        dispatch(setCurrentUser(decoded))
      })
      .catch((error) => {
          console.log('error in console logging ', error)
        //errorHandler(dispatch, error.res, actionTypes.AUTH_ERROR)
      });
      }
	}

export function logoutUser () {
	return (dispatch) => {
		// localStorage.removeItem('jwtToken');
		localStorage.clear();
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	}
}
// function updateLogout () {
// 	return {
// 		type: actionTypes.LOGOUT_USER
// 	}
// }
 

/********************************** GET CLASSES TO DISPLAY ON TEACHERS MAIN VIEW ***********************************/
function getTeacherEmail(state) {
	return {
		email: state().auth.user.email
	}
}

export function getClasses(emailObj) {
	//console.log('emailobj', emailObj)
	return (dispatch) => {
		axios.post('/allClasses', emailObj)
		.then((res) => {
			//console.log('got here');
			dispatch(getClassesAction(res.data))
			//console.log('Data received by client', res.data);
		})
	}
}

function getClassesAction(classes) {
  return {
		type: actionTypes.GET_TEACHERS_CLASSES,
		classes
	}
}

//show class builder modal
export function toggleModalAction() {
	return {
		type: actionTypes.TOGGLE_CLASS_BUILDER_MODAL
	}
}


/************************** CLASS BUILDER MODAL *************************/
export function updateNewClassName(event) {
	return (dispatch) => {
		dispatch(updateNewClassNameAction(event))
	}
}
function updateNewClassNameAction(event) {
	return {
		type: actionTypes.UPDATE_NEW_CLASS_NAME_ACTION,
		event
	}
}

export function updateNewClassSubject(event) {
	return (dispatch) => {
		dispatch(updateNewClassSubjectAction(event))
	}
}
function updateNewClassSubjectAction(event) {
	return {
		type: actionTypes.UPDATE_NEW_CLASS_SUBJECT_ACTION,
		event
	}
}

export function updateNewClassQuarter(quarter) {
	return (dispatch) => {
		dispatch(updateNewClassQuarterAction(quarter))
	}
}
function updateNewClassQuarterAction(quarter) {
	return {
		type: actionTypes.UPDATE_NEW_CLASS_QUARTER_ACTION,
		quarter
	}
}

export function updateNewClassYear(year) {
	return (dispatch) => {
		dispatch(updateNewClassYearAction(year));
	}
}
function updateNewClassYearAction(year) {
	return {
		type: actionTypes.UPDATE_NEW_CLASS_YEAR_ACTION,
		year
	}
}

/******************** LIVE CLASS VIEW ********************/
//this should make a call to db to get the target information including 
//students belongs to that class & quizzes that belong to the teacher (quizzes later)
export function teacherEnterClass() {
	return (dispatch) => {
		axios.get('/getTargetClass')
		.then((res) => {
			dispatch(teacherEnterClassAction(res.data))
		})	
	}
}

//when a teacher enter a class, add to the store a target class obj
export function updateTargetClass(targetClass) {
	return (dispatch) => {
		dispatch(updateTargetClassAction(targetClass))
	}
}
function updateTargetClassAction(targetClass) {
	return {
		type: actionTypes.UPDATE_TARGET_CLASS_ACTION,
		targetClass
	}
}

export function getAllStudents() {
	return (dispatch) => {
		axios.get('/getAllStudents')
		.then((res) => {
			//console.log('all students', res.data);
			dispatch(getAllStudentsAction(res.data));
		})
	}
}
function getAllStudentsAction(students) {
	return {
		type: actionTypes.GET_ALL_STUDENTS_ACTION,
		students
	}
}

export function getStudentsBelongToAClass(idObj) {
	console.log('console.log', idObj)
	return (dispatch) => {
		axios.post('/getAllStudentsInAClass', idObj)
		.then((res) => {
			console.log('dataaaaaa', res.data);
			dispatch(getStudentsBelongToAClassAction(res.data))
		})
	}
}
function getStudentsBelongToAClassAction(students) {
	return {
		type: actionTypes.GET_STUDENTS_BELONGS_TO_A_CLASS_ACTION,
		students
	}
}



export function classGoLive(classId, classObj) {
	return (dispatch) => {
		const classes = fb.ref('/');
		classes.child(classId).set(classObj)
		.then(() => {
			dispatch(classGoLiveAction());
		})
	}
}
function classGoLiveAction() {
	return {
		type: actionTypes.CLASS_GO_LIVE_ACTION
	}
}

/******************************* GET ALL CLASSES THAT BELONGS TO A STUDENT **********************************/

export function getClassesBelongToAStudent(studentIdObj) {
	return (dispatch) => {
		axios.post('/getStudentsClasses', studentIdObj)
		.then((res) => {
			console.log('students classes', res.data)
			dispatch(getClassesBelongToAStudentAction(res.data))
		})
	}
}
function getClassesBelongToAStudentAction(classes) {
	return {
		type: actionTypes.GET_CLASSES_BELONG_TO_A_STUDENT_ACTION,
		classes
	}
}
// make class live - > from teacher pov
export function launchLiveClass(classObj) {
	const classes = fb.ref('/classes');
	return (dispatch) => {
		classes.push(classObj)
		.then( () => {
			dispatch(fetchClassData(classObj.id));
		})
	}
}

export function launchQuiz (classId, quizObj) {
	// store postgres quiz id to active view property in the
	const currentClass = fb.ref('/classes/ ' + classId )
	return (dispatch) => {
		updateActiveView(quizObj.quizId, classId)
		.then(()=> {
			currentClass.ref('/quizzes').push(quizObj)
		})
		.then(() => {
			// create a copy of quiz object for each student in that class (with answers defaulted to false)
			const studentQuizObj = studentQuizObjConverter(quizObj);
			// get all student Ids from current class in fb
			const studentIdsArray = Object.keys(fb.ref('/classes/' + classId + '/students').val());
			studentIdsArray.forEach( studentId => {
				// iterate through all student ID array
				// create ref to that students quizzes
				let studentRef = fb.ref('/classes/' + classId + '/students' + studentId);
				// push studentQuizObj to each of those 
				studentRef.push(studentQuizObj)
			})
		})
	}
}

// join/exit live class from student pov
export function toggleStudentLiveClassStatus (classId, studentId) {
	const currentStudentStatus = fb.ref('/classes' + classId + '/students' + studentId + '/isHere')
	return (dispatch) => {
		currentStudentStatus.set(!currentStudentStatus)
		.then(()=> {
			return currentStudentStatus.once('value')
		})
		.then((snap) => {
			const status = snap.val();
			if (status) {
				dispatch(fetchClassData(classId))
			} else {
				dispatch(stopFetchingClassData(classId))
			}
		})
	}
}

// change newView to be quiz id or false
export function updateActiveView (newView, classId) {
	const currentClassActiveView = fb.ref('/classes/' + classId + '/activeView')
	return (dispatch )=> {
		return currentClassActiveView.set(newView)
	}
}

// submit a student's responses to a quiz every time they check an answer
export function insertStudentAnswers(quizObj, studentId, quizId, classId) {
	const currentStudent = fb.ref('classes/' + classId + '/students/' + studentId + '/quizzes/' + quizId );
	return (dispatch) => {
		currentStudent.set(quizObj);
	}
}
 
// get all class data for a live class
export function fetchClassData (classId) {
	const currentClass = fb.ref('/classes/' + classId )
	return (dispatch) => {
		currentClass.on('value', function(snap) {
			dispatch(updateClassData(snap.val()))
		})

	}
}
// turns off a student/teacher's listener for a live class 
export function stopFetchingClassData (classId) {
	const currentClass = fb.ref('/classes/' + classId )
	return (dispatch) => {
		currentClass.off('value')
	}
}
// update global state with updated live class data
function updateClassData(classData) {
	return {
		type: actionTypes.UPDATE_CLASS_DATA,
		classData
	}
}