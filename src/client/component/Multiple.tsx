import React from 'react'
import PropTypes from 'prop-types'
import { Question } from '../types'
//import { Question } from '../types'

export interface MultipleProps { question: Question }

const Multiple = (props: MultipleProps) => {

  return (
    <div>
      Multiple
             <div>{props.question && props.question.question}</div> <br />
      <div>{props.question.incorrect_answers.map(q => q)} </div>
    </div>
  )
}

Multiple.propTypes = {

}

export default Multiple
