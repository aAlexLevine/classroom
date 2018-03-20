import React from 'react';

class Answers extends React.Component {
  constructor(){
    super();
    this.state = {
      selected: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log('clicked', this.state.selected)
  }

render() {
  return (
    
        <div>
          <form>
            <li>
              {this.props.choice}
                <input type="checkbox" name="selected" value={this.props.choice} onChange={(e) => this.handleChange(e)}></input>
            </li>
            
          </form>
        
        </div>
    
    )
  }
}
export default Answers;