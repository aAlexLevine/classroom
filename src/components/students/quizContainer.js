import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import Answers from 'Answers.jsx';
import Question from 'Question.jsx';
import StudentViewQuiz from 'StudentViewQuiz.jsx';
import * as Actions from '../../actions/index.js';

//import reducers?

class QuizContainer extends React.Component {

  render() {
    return (
      <div>

      </div>
    )
  }

}

function mapStateToProps(state) {
  return {

  }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(QuizCOntainer);