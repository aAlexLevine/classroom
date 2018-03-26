import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import ClassLabel from './classLabel.jsx';
import * as Actions from "../../actions/index.js";
import Default from './classViewDefault.jsx'
import QuizContainer from './quizContainer.jsx'


class StudentLiveClassView extends React.Component {
  constructor() {
		super();
	}
  render() {
	console.log('STUDENT LIVE CLASS VIEW PROPS.TARGETCLASS ', this.props.targetClass)
		
			if(this.props.targetClass.isLive){
				return <QuizContainer/>
			} else {
				return <Default/>
			}
	
		// if (!this.props.studentClassView.targetClass.quizzes) {
		// 	 return <ClassViewDefault />
		// } else {
		// 	 return <quizContainer/>
		// }
  }
}

function mapStateToProps(state) {
	return {
		// targetClass: state.studentClassView.targetClass
		targetClass: state.teachersClassView.targetClass
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(StudentLiveClassView)