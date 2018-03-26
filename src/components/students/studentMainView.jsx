import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import ClassLabel from './classLabel.jsx';
import * as Actions from "../../actions/index.js";
//import ClassBuilderModal from './classBuilderModal';
import axios from "axios";
import StudentClassLabel from "./studentClassLabel.jsx";
/****** Grommet Stuff ******/
import "grommet/scss/hpinc/index.scss";
import GrommetApp from "grommet/components/App";
// import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Box from "grommet/components/Box";
import Search from "grommet/components/Search";
import Menu from "grommet/components/Menu";
import MenuIcon from "grommet/components/icons/base/Menu";
import Anchor from "grommet/components/Anchor";
import Hero from "grommet/components/Hero";
import Heading from "grommet/components/Heading";
import Image from "grommet/components/Image";
import Button from "grommet/components/Button";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import Section from "grommet/components/Section";
import AddCircleIcon from "grommet/components/icons/base/AddCircle";
import Layer from "grommet/components/Layer";
import Form from "grommet/components/Form";
import Footer from "grommet/components/Footer";
import FormFields from "grommet/components/FormFields";
import TextInput from "grommet/components/TextInput";
import Select from "grommet/components/Select";
import Header from "grommet/components/Header";
import Card from "grommet/components/Card";

class StudentMainView extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    //consol
    this.props.getClassesBelongToAStudent({
      email: this.props.auth.user.email
    });
    //this.props.watchClassGoLive()
  }

  // updateTargetClassAndStudentStatus() {
  //   this.props.updateStudentTargetClass(this.props.targetClassId, this.props.studentId)

  // }
  render() {
    console.log('classes', this.props.classes, this.props.classes.color);
    return (
      <div>
        <Tiles flush={false} selectable={true}>
          {/* onSelect some function */}
          {this.props.classes.map((item, index) => {
            return (
              <Tile key={index}>
                <Card
                  style={{ background: item.isLive ? 'lightGreen' : 'white'}}
                  thumbnail={item.thunmbnail}
                  label={item.year}
                  heading={item.name}
                  description="Sample description providing more details."
                />
                <Button
                  label="Enter Class"
                  type="button"
                  path="/studentLiveClass"
                  // path="default"
                  primary={true}
                  onClick={() => this.props.toggleStudentLiveClassStatus(item.class_id, item.student_id)}
                />
              </Tile>
            );
            // return <StudentClassLabel item={item} key={index} clickHandler={this.props.updateStudentTargetClass}/>;
          })}
        </Tiles>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    classes: state.studentClassView.classes
  };
}

function matchDispatchToProps(dispatch) {
  Actions.watchClassGoLive(dispatch);
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(StudentMainView);
