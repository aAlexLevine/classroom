import React from 'react';
import axios from 'axios';
import Question from './Question.jsx'
import quizDummyData from '../../../data/quizDummyData.js'

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

forwardClick() {
  if(this.state.index < this.state.totalQuestions - 1){
  this.setState({index: this.state.index + 1})
  }
}

backwardClick() {
  if (this.state.index !== 0) {
  this.setState({index: this.state.index - 1})
  }
}

render() {
  return (
    <div> 
    {console.log('------------',this.state.totalQuestions)}
      <h1>Quiz</h1>
        <h2>Question {this.state.index + 1}</h2>
          <Question question={this.state.quizes[this.state.quizID].questions[this.state.index]}/>
          
          <button onClick={this.backwardClick}>Previous Question</button>
          
          <button onClick={this.forwardClick}>Next Question</button>
      
    </div>
    )
  }
}



export default StudentViewQuiz;