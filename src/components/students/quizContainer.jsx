import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import Answers from './Answers.jsx';
import Question from './Question.jsx';
import StudentViewQuiz from './StudentViewQuiz.jsx';
import * as actions from '../../actions/index.js';
import data from '../../../data/quizDummyData.js'
import fb from '../../../db/liveClassroom.js';


class QuizContainer extends React.Component {
  render() {

    console.log('PROPS IN CONTAINER',this.props)
    console.log('user  in container----', this.props.auth.user.id)
    
    let classId = this.props.class.id
    console.log('classId', classId)
   
    let quizId = this.props.class.activeView
    console.log('quizId', quizId)

    let quiz = this.props.class.quizzes[quizId].questions
    let keys = Object.keys(quiz)
    let studentId = this.props.auth.user.id

    //The question NUMBER this student is on //from student portion
    let currentQuestion = this.props.class.students[studentId].quizzes[quizId].currentQuestion
    //Student's responseObj at current question
    let quizResponseObj = this.props.class.students[studentId].quizzes[quizId]
    //The ACTUAL QUESTION this student is on // from the teachers quiz at key of students current question// to display question text
    let question = this.props.class.quizzes[quizId].questions[keys[currentQuestion]]    
    //The students ANSWERS Obj of Booleans //from student portion
    let currentQuestionsAnswers = this.props.class.students[studentId].quizzes[quizId].responses[keys[currentQuestion]].answers
    
    let questionId = keys[currentQuestion]
  
    return (
      
      <div>
        -----TEST
        <StudentViewQuiz 
                        class={this.props.class}
                        studentId={studentId}
                        classId={classId}
                        quizId={quizId}
                        studentId={studentId}
                        insertStudentAnswers={fb.insertStudentAnswers}
                        keys={keys}
                        question={question}
                        currentQuestion={currentQuestion}
                        quizResponseObj={quizResponseObj}
                        currentQuestionsAnswers={currentQuestionsAnswers}
                        questionId={questionId}
        />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    class: state.studentClassView.targetClass,
    auth: state.auth
  }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(QuizContainer);