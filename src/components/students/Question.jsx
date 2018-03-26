import React from 'react';
import Answers from './Answers.jsx'
import Card from 'grommet/components/Card';
import Tile from 'grommet/components/Tile';
// import Tile from 'grommet/components/Tile';
import Section from 'grommet/components/Section';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Animate from 'grommet/components/Animate';


class Question extends React.Component {
  constructor(props) {
    super(props);
  }
 
  
render() {
   let answerArray = Object.keys(this.props.currentQuestionsAnswers)
  return (
    <Section >
        <Animate enter={{"animation": "fade", "duration": 1000, "delay": 0}}keep={true}>
          <Label>

              {this.props.question.text}                
            
          </Label>
        
          <List>
              <ol>
                {answerArray.map((answerNum, i) => (
                <Answers key={i} 
                  answersText={this.props.question.answers}
                  answerNum={answerNum} 
                  currentQuestionsAnswers={this.props.currentQuestionsAnswers}
                  questionId={this.props.questionId}
                  quizResponseObj={this.props.quizResponseObj}
                  currentQuestion={this.props.currentQuestion}
                  studentId={this.props.studentId}
                  classId={this.props.classId}
                  insertStudentAnswers={this.props.insertStudentAnswers}
                  quizId={this.props.quizId}            
          
                />
                ))}
              </ol>
        </List>
      </Animate>
       
     </Section>
  )
}
}

const questionCSS = {border: 'solid'}

export default Question;

