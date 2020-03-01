import React from 'react'
import PropTypes from 'prop-types'
import { Question } from '../types'
import { Row, Col } from 'react-bootstrap'
import { RadioButton } from 'primereact/radiobutton'
//import { Question } from '../types'

/**
 * Functional component for Multiple options question
 * 
 * @author Jayakumar Jayaraman * 
 */
const Multiple = (props: MultipleProps) => {

  const { question, answer, handleOnChange } = props

  return (
    <div>
      {
        question?.incorrect_answers.concat(question.correct_answer).sort()
          .map((a, idx) =>
            <Row key={idx}>
              <Col lg={1}>
                <RadioButton name='multipleQuestion' data-testid='multipleQuestion'
                  onChange={handleOnChange} value={a} checked={a === answer} />
              </Col>
              <Col lg={11}>
                <label>{a}</label>
              </Col>
            </Row>
          )
      }
    </div>
  )
}


export interface MultipleProps { question: Question, answer: string, handleOnChange: any }

Multiple.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.string,
  handleOnChange: PropTypes.func
}

export default Multiple
