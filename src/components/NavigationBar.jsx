import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import App from "./app.jsx";
import SignIn from "./SignIn.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/index";
import TeacherMainView from "./teachers/mainView.jsx";
import StudentMainView from "./students/studentMainView.jsx";
import ClassView from "./teachers/classView.jsx";
import Headline from "grommet/components/Headline"
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Anchor from "grommet/components/Anchor";
import Menu from "grommet/components/Menu";
import Box from "grommet/components/Box";
import Actions from "grommet/components/icons/base/Action.js";
import QuizView from "./teachers/quizView.jsx";
import SignUp from './Signup.jsx';
import StudentViewQuiz from './students/StudentViewQuiz.jsx'
import quizContainer from './students/quizContainer.jsx'
import StudentLiveClassView from './students/studentLiveClassView.jsx'
import ClassViewDefault from './students/classViewDefault.jsx';
// import StudentLiveClassView from "./students/studentLiveClassView.jsx";

import quizView from './teachers/quizView.jsx';


import { readdir } from "fs";

import "grommet/scss/hpinc/index.scss";
import {logoutUser} from '../actions/index.js';
 
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuth = this.checkAuth.bind(this);
    this.checkView = this.checkView.bind(this);
  }
  checkView() {
    return <Redirect to="/default"/>
    // setTimeout(function() {
    //     return <Redirect to="/studentLiveClass2"/>
    // }, 3000) 
  }

  checkAuth() {
    if (this.props.auth.authenticated === true) {
      if (this.props.auth.user.class === "teacher") {
        return <Redirect to="/teachermainview" />;
      } else {
        if (this.props.auth.user.class === "student") {
          return <Redirect to="/studentmainview" />;
        }
      }
    } else {
      return <SignIn />;
    }
}
    logout (e) {
        e.preventDefault();
        this.props.logoutUser();
    }
    logout (e) {
        e.preventDefault();
        this.props.logoutUser();
    }
    
    render() {
        const titleStyle = {
            marginLeft: '50px'
        }
        if (!this.props.auth.authenticated) {
            var menuLabel = 'Start';
            var navBarBackground = 'lightGreen'
            var dropAnchors = 
                <div>
                    <Anchor path="/login">
                        Login 
                    </Anchor>
                    <Anchor path="/signup">
                        Signup 
                    </Anchor>
                </div>
        } else {
            if (this.props.auth.user.class === 'teacher') {
                var menuLabel = this.props.auth.user.email;
                var navBarBackground = 'lightCoral'
                var dropAnchors = 
                <div>
                    <Anchor path="/quiz">
                        Quiz 
                    </Anchor>

                     <Anchor path='/teachermainview'>
                        Main View
                    </Anchor>



                    <Anchor path='/login' onClick={this.logout}>
                        Logout
                    </Anchor>
                </div>
            }
            if (this.props.auth.user.class === 'student') {
                var menuLabel = this.props.auth.user.email;
                var navBarBackground = 'lightBlue'
                var dropAnchors = 
                <div>
                    <Anchor path='/login' onClick={this.logout}>
                        Logout
                    </Anchor>


                    {/* <Anchor path='/studentQuiz'>
                        studentQuiz
                    </Anchor> */}
                </div>
            }
        }
        return (
        <div>
            <Router history={this.props.history} >
                <nav className="navbar navbar-default"> 

            <Header
                style={{background: navBarBackground}}
                size='medium'>
                <Headline margin='large' style={titleStyle} primary={true} >
                    Jaqen
                </Headline>
                <Box flex={true}
                    margin='large'
                    justify='end'
                    direction='row'
                    responsive={false}>
                    <Menu 
                        primary={false}
                        direction='row'
                        label={menuLabel}
                        icon={<Actions/>}>
                        {dropAnchors}
                    </Menu>
                </Box>
            </Header>
                           
                            


        
                        <Switch>
                            <Route path="/teachermainview" component={TeacherMainView} />
                            {/* <Route path="/studentmainview" component={TeacherMainView} /> */}
                            <Route exact path="/login"  render={
                                    this.checkAuth
                            } />  
                            <Route path="/liveclass" component={ClassView}/>
                            <Route path="/studentmainview" component={StudentMainView} />
                            <Route path="/login" component={SignIn}  />
                            <Route path="/teacherQuiz" component={ClassView}  />
                        
                            <Route path="/quiz" component={QuizView}  />
                            <Route path="/studentQuiz" component={quizContainer}/>
                            {/* <Route path="/studentClass" component={StudentClass}  /> */}
                            {/* <Route path="/studentliveclass" component={StudentLiveClassView}/> */}
                            
                            <Route path="/signUp" component={SignUp}/>
                            {/* <Route path="/quiz" component={StudentViewQuiz}/> */}
                            {/* <Route path="/studentLiveClass" render={this.checkView}/> */}
                            <Route path="/default" component={ClassViewDefault}/>
                            <Route path="/studentLiveClass" component={StudentLiveClassView}/>
                            
                        </Switch>
                </nav>
                </Router>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    // subject to change
    auth: state.auth,
    activeView: state.teachersClassView.targetClass.activeView
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NavigationBar);

// export default NavigationBar;
