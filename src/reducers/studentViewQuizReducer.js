import actionTypes from '../actions/types.js';
import quizzes from '../../data/quizDummyData.js';


export function studentViewQuizReducer(state={
  quizzes: quizzes,
  quizID: 0,
  index: 0,
  totalQuestions: 3

}, action) {
  switch(action.type) {
    case actionTypes.GET_QUIZ:
      return {...state, activeView: action.quiz}
    case actionTypes.NEXT_QUESTION:
      return {...state, quizzes: action.quizzes}
    case actionTypes.PREVIOUS_QUESTION:
    default: return state
  }
}