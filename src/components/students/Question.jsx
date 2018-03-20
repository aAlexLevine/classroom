import React from 'react';
import Answers from './Answers.jsx'
import Card from 'grommet/components/Card';
import Tile from 'grommet/components/Tile';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0
    }
  }

  handleSubmit(answer) {
    axios.post('/answer', { answer: answer })
      .then(()=> {
        console.log('answer')
      })
      .catch((error)=>{
        console.log('error, Answers.jsx', error)
      })
      // e.preventDefault()
    }
  

render() {
   {console.log('props in question', this.props)}
  return (
    <Tile style={questionCSS}>
        
        <div>
          {this.props.question.q}  
        </div>
        
        <div>
          <ol>
          {this.props.question.choices.map((choice, i) => (
            <Answers key={i} choice={choice} />
          ))}
          </ol>
        </div>
        <button>Submit Answer</button>
     </Tile>
  )
}
}

const questionCSS = {border: 'solid'}

export default Question;