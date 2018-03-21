import React from 'react';
import axios from 'axios';
import Question from './Question.jsx'
import quizDummyData from '../../../data/quizDummyData.js'
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';


class StudentViewQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      quizes: quizDummyData, 
      quizID: 0,
      index: 0,
      totalQuestions: 3
    }
    this.forwardClick = this.forwardClick.bind(this)
    this.backwardClick = this.backwardClick.bind(this)
  }

componentDidMount() {
 
  // axios.get('/')
  // .then((response) => {
  //   this.setState({quizes: response.data})
  //   this.setState({quizID: response.data.quizID})
  //   this.setState({totalQuestions: response.data.length})
  //   console.log('Quizes set in StudentViewQuiz.jsx')
  // })
  // .catch((error)=>{
  //     console.log('error in axios StudentVIewQuiz', error)
  // })
}

forwardClick(e) {
  e.preventDefault()
  if(this.state.index < this.state.totalQuestions - 1){
  this.setState({index: this.state.index + 1})
  }
}

backwardClick(e) {
  e.preventDefault()
  if (this.state.index !== 0) {
  this.setState({index: this.state.index - 1})
  }
}

render() {
  return (
    <Form pad='large'> 
    {console.log('------------',this.state.totalQuestions)}
      
      <Header>
        <Heading>
        Quiz
        </Heading>
      </Header>
        <h2>Question {this.state.index + 1}</h2>
          <Question question={this.state.quizes[this.state.quizID].questions[this.state.index]}/>
          

        <Button 
          label='Previous Question'
          href='#'
          primary={true}
          secondary={false}
          accent={false}
          critical={false}
          plain={false}
          onClick={(e)=> this.backwardClick(e)} />

          <Button 
          label='Next Question'
          href='#'
          primary={true}
          secondary={false}
          accent={false}
          critical={false}
          plain={false}
          onClick={(e)=> this.forwardClick(e)} />

          {/* <button onClick={this.backwardClick}>Previous Question</button> */}
          
          {/* <button onClick={this.forwardClick}>Next Question</button> */}
      
    </Form>
    )
  }
}

function mapStateToProps(stte) {
  // return {
  //   notSureYet: state. 
  // }
}

export default StudentViewQuiz;