import React from 'react'


import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';

const classViewDefault = () => {
  console.log('-----LOGGED IN classViewDefault')
  return (
    <div style={{
      left: 0,
      lineHeight: '200px',
      marginTop: '-100px',
      position: 'absolute',
      textAlign: 'center',
      top: '50%',
      width: '100%'
    }}>
      <Heading align="center">
  
        No quiz is active now.
  
      </Heading>

      {/* Button should link to prev student quiz data */}
      <Button label='View Previous Quizzes'
        href='#'
        accent={true} />
    </div>
  )
}
 
export default classViewDefault;