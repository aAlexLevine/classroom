import React from 'react';
import TeacherMainView from './teachers/mainView.jsx';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from './NavigationBar.jsx';
import { Link, withRouter } from 'react-router';  

/****** Grommet Stuff ******/
import 'grommet/scss/hpinc/index.scss';
import GrommetApp from 'grommet/components/App';
// import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Menu from 'grommet/components/Menu';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Anchor from 'grommet/components/Anchor';
import Hero from 'grommet/components/Hero';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';
/****** Grommet Stuff ******/
import SignUp from './SignUp.jsx'
import StudentViewQuiz from './students/StudentViewQuiz.jsx';

class App extends React.Component {
  render() {
	 /*
		 if not logged in,
			 redirect to log in
		if logged in as teacher 
			redir to teacherview
		if logged in as student
			redir to student viwe

	 */
		return(
			// <Router>
			// 	<Route path="/" component={TeacherMainView} />
			// 	<Route path='/class' component={ClassView} />
			// </Router>
			<div>
				{/* Will need to put a conditional statement here for different class of user
				in case of conditional rendering or use router */}
				{/* <TeacherMainView /> */}
)
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
		// subject to change
		teachersClassView: state.teachersClassView
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App)
//export default App;

