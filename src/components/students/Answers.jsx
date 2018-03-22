import React from 'react';
import ListItem from 'grommet/components/ListItem';
import CheckBox from 'grommet/components/CheckBox';



class Answers extends React.Component {
  constructor(){
    super();
    this.state = {
      answer: '',
      checkedStatus: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

componentDidMount(){
  this.setState({checkedStatus:this.props.studentResponseObj[this.props.answerNum]})
}

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      checkedStatus: !this.state.checkedStatus
    }, () => {
      this.props.handleSelect({checkedStatus: this.state.checkedStatus, answer:this.state.answer});
    })
    console.log('clicked', this.state.selected)
  }

render() {
  return (
    
        <ListItem separator='horizontal' justify='between'>
          {/* <li> */}
          <span>
            
             {this.props.answerNum + ' )'} {this.props.answersObj[this.props.answerNum].text}
              
          </span>
                
          <span className='secondary'>     
                <CheckBox type="checkbox" 
                  name="answer" 
                  value={this.props.answersObj[this.props.answerNum].text} 
                  checked={this.state.checkedStatus}
                  onChange={(e) => this.handleChange(e)}/>
           
            </span>
            {/* </li> */}
          
        
        </ListItem>
    
    )
  }
}
export default Answers;