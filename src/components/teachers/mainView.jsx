import React from "react";
import ClassLabel from "./classLabel.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import ClassLabel from './classLabel.jsx';
import * as Actions from '../../actions/index.js';
//import ClassBuilderModal from './classBuilderModal';

/****** Grommet Stuff ******/
import "grommet/scss/hpinc/index.scss";
import GrommetApp from "grommet/components/App";
import Header from "grommet/components/Header";
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
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import FormFields from 'grommet/components/FormFields';
import TextInput from 'grommet/components/TextInput';
import Select from 'grommet/components/Select';


/****** Grommet Stuff ******/

class TeacherMainView extends React.Component {
  constructor() {
		super();
		this.toggleModalHandler = this.toggleModalHandler.bind(this);
		this.newClassNameChangeHandler = this.newClassNameChangeHandler.bind(this);
		this.newClassSubjectChangeHandler = this.newClassSubjectChangeHandler.bind(this);
		this.newClassQuarterChangeHandler = this.newClassQuarterChangeHandler.bind(this);
		this.newClassYearChangeHandler = this.newClassYearChangeHandler.bind(this);
  }

	toggleModalHandler() {
		this.props.toggleModalAction()
	}

	newClassNameChangeHandler(value) {
		this.props.updateNewClassName(value)
	}

	newClassSubjectChangeHandler(value) {
		this.props.updateNewClassSubject(value)
	}

	newClassQuarterChangeHandler(value) {
		this.props.updateNewClassQuarter(value)
	}

	newClassYearChangeHandler(value) {
		this.props.updateNewClassYear(value)
	}

	addClassHandler() {
		this.props.addClassAction()
	}

  componentDidMount() {
    //this.props.getClassesAction()
  }

  render() {
    return (
      <div>
        {/* <Section> */}
          <Menu
            responsive={true}
            icon={<MenuIcon />}
            label="Menu"
            inline={false}
            primary={false}
          >
            <Anchor href="#" className="active">
              Classes
            </Anchor>
            <Anchor href="#">Students</Anchor>
            <Anchor href="#">Quizzes</Anchor>
          </Menu>
        {/* </Section> */}
        <Tiles flush={false} selectable={true}>
          {/* onSelect some function */}
          {this.props.classes.map((item, index) => {
            return <ClassLabel item={item} key={index} />;
          })}
          <Tile label="Label" href="#">
            <Button icon={<AddCircleIcon size="huge" onClick={() => this.toggleModalHandler()}/>} />
            {/* onClick={...} */}
          </Tile>
        </Tiles>
				{this.props.showClassBuilderModal === true ? 
					<Layer
					closer={true}
					flush={true}
					overlayClose={true}
					onClose={this.toggleModalHandler}
				>
					{/* // onClose={...}>
					// <t onCancel={...} */}
					{/* //   onSubmit={...}  */}
					<Form>
						<Header pad={{ vertical: "medium", horizontal: "medium" }}>
							Make A New Class
						</Header>
						<FormFields pad={{ horizontal: "medium" }}>
							<TextInput placeHolder="Please Enter Class Name" 
												 onDOMChange={(value) => {this.newClassNameChangeHandler(value)}}
												 value={this.props.newClassName}/>
							<TextInput placeHolder="Please Enter Class's Subject" 
												 onDOMChange={(value) => {this.newClassSubjectChangeHandler(value)}}
												 value={this.props.newClassSubject}/>
							<Select
								placeHolder="Select School Year"
								inline={false}
								multiple={true}
								// onSearch={false}
								options={["2018", "2019", "2020", "2021", "2022"]}
								value={this.props.newClassYear}
								onChange={(value) => this.newClassYearChangeHandler(value)}
							/>
							{/* // onChange={...} /> */}
							<Select
								placeHolder="Select Quarter"
								inline={false}
								multiple={false}
								options={["First", "Second", "Third", "Fourth"]}
								value={this.props.newClassQuarter}
								onChange={(value) => this.newClassQuarterChangeHandler(value)}
							/>
						</FormFields>
						<Footer pad={{ vertical: "medium", horizontal: "medium" }}>
							<Button label="Create Class" 
											type="button"
											path='/liveclass' 
											primary={true} 
											onClick={() => this.addClassHandler()}/>
							{/* onClick={...} /> this would be a function to save class to postgres */}
						</Footer>
					</Form>
				</Layer>
				: <div></div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
		classes: state.teachersClassView.classes,
		showClassBuilderModal: state.teachersClassView.showClassBuilderModal,
		newClassName: state.teachersClassView.newClassName,
		newClassSubject: state.teachersClassView.newClassSubject,
		newClassQuarter: state.teachersClassView.newClassQuarter,
		newClassYear: state.teachersClassView.newClassYear
  };
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(TeacherMainView);
