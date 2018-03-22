import React from 'react';
import axios from 'axios';
import Question from './Question.jsx'
// import data from '../../../data/quizDummyData.js'
import data from '../../../data/quizDummyData.js'
// import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Label from 'grommet/components/Label';
import Title from 'grommet/components/Title';


let classRoom = data.classRoom['25']
let students = classRoom.students
let currentQuestion = students['38'].quizzes['12'].currentQuestion
// let { students } = data.classRoom['25'].students
// let { currentQuestion } = students['38'].quizzes['12'].currentQuestion
let quiz = data.quiz

class StudentViewQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      studentID: '38',
      currentQuestion: 2,
      quizzes: quiz, 
      quizId: 12,
      index: 0,
      totalQuestions: 3,
       
    }
    this.forwardClick = this.forwardClick.bind(this)
    this.backwardClick = this.backwardClick.bind(this)
  }

componentDidMount() {
  this.setState({
    totalQuestions: Object.keys(quiz.questions).length
  })
  //run some action that will update totalQuestions
 

  // axios.get('/quizzes')
  // .then((response) => {
  //   this.setState({quizzes: response.data})
  //   this.setState({quizID: response.data.quizID})
  //   this.setState({totalQuestions: response.data.length})
  //   console.log('Quizzes set in StudentViewQuiz.jsx')
  // })
  // .catch((error)=>{
  //     console.log('error in axios StudentVIewQuiz', error)
  // })
}

// resetChecks() {
//   this.setState({
//     checked: false
//   })
// }

forwardClick(e) {
  e.preventDefault()
  //run some action that updates the current question ++
    //conditional to the question
    // send dummyResponse.['38'].quizzes['12'].currentQuestion++
// currentQuestion++
  if(this.state.index < this.state.totalQuestions ){
    currentQuestion++
  this.setState({index: this.state.index + 1})
  }
}

backwardClick(e) {


  e.preventDefault()
  if (currentQuestion !== 1) {
    currentQuestion--
  this.setState({index: this.state.index - 1})
  }
}

render() {
  // const currentQuestion = students['38'].quizzes['12'].currentQuestion
    console.log('currentQuestion',currentQuestion)
  return (
    <Section pad='large'>    
      <Header>
        <Heading>
           Quiz
        </Heading>
      </Header>
    
        <Title>Question {this.state.index + 1}</Title>
        {/* // quiz.questions[students[this.props.userId].quizzes[quiz.id].currentQuestion] */}

        {/* Current Question from quiz object at key of [this student's quizID currect question   */}   
          <Question question={quiz.questions[students['38'].quizzes['12'].currentQuestion]}
                    studentResponseObj={students['38'].quizzes['12'].responses[currentQuestion].answers}    
          />
              {console.log('-------QUESTION',quiz.questions[students['38'].quizzes['12'].currentQuestion])}
        
      <span>
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
          onClick={(e)=> this.forwardClick(e)}
           />
      </span>
          {/* <button onClick={this.backwardClick}>Previous Question</button> */}
          
          {/* <button onClick={this.forwardClick}>Next Question</button> */}
    </Section>
    )
  }
}



export default StudentViewQuiz;

