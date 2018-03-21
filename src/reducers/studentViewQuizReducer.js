import actionTypes from '../actions/types.js';
import quizes from '../../data/quizDummyData.js';


export function studentQuizeViewReducer(state={
  quizes: quizes 
}, action) {
  switch(action.type) {
    case acionTypes.GET_QUIZ:
      return {...state, activeView: action.quiz}
    case actionTypes.NEXT_QUESTION:
      return {...state, quizes: action.quizes}
    case actionTypes.PREVIOUS_QUESTION:
    default: return state
  }
}