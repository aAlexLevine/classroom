import React from 'react';
import SignUp from './SignUp.jsx'
import StudentViewQuiz from './students/StudentViewQuiz.jsx';

class App extends React.Component {
  render() {
		return(
			<div>
				This is just a place holder for now.
				{/* <SignUp/> */}
				<StudentViewQuiz/>
			</div>
		)
	}
}

export default App;