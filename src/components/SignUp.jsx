import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
        email: '',
        password: '',
        firstName:'',
        lastName:'',
        userClass: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
    
  handleSubmit(e) {
    let newAccount = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userClass: this.state.userClass
    }
       
    axios.post('/newAccount', { newAccount })
      .then(()=> {
        console.log('newAccount')
        this.setState({
          email: '',
          password: '',
        })
      })
      .catch((error)=>{
        console.log('error, SignUp.jsx', error)
      })
      // e.preventDefault()
    }

render(){
  return (
    <div>
      <h1>Sign-Up</h1>
        <form name="sign-up" onSubmit={(e) => this.handleSubmit(e)}>
          <h3>Create New Account with your e-mail address</h3>
            <input name="email" value={this.state.email} placeholder="e-mail address" onChange={(e) => this.handleChange(e)}/> 
            <br/>
          <h3>Create Password</h3>
            <input name="password" value={this.state.password} placeholder="Password" onChange={(e) => this.handleChange(e)}/>   
            <br/>  
          <h3>Enter your First Name</h3>
            <input name="firstName" value={this.state.firstName} placeholder="First name" onChange={(e) => this.handleChange(e)}/> 
          <h3>Enter your Last Name</h3>
            <input name="lastName" value={this.state.lastName} placeholder="Last name" onChange={(e) => this.handleChange(e)}/> 
          <h3>Please choose one</h3>
            <input type="radio" value="student" name="userClass" onChange={(e) => this.handleChange(e)}/>Student
            <input type="radio" value="teacher" name="userClass" onChange={(e) => this.handleChange(e)}/>Teacher
            <br/>
            <button type="submit">Create Account</button>
        </form>
    </div>
    )
  }
}

export default SignUp;