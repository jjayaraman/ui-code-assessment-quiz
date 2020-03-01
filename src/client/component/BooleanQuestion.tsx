import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { RadioButton } from 'primereact/radiobutton'

export interface BooleanQuestionProps { handleOnChange: any, answer: string }

const BooleanQuestion = (props: BooleanQuestionProps) => {
    const { handleOnChange, answer } = props

    return (
        <div>
            <Row>
                <Col lg={1}><RadioButton id='booleanQuestionTrue' data-testid='booleanQuestionTrue'
                    onChange={handleOnChange} value={'true'} checked={answer === 'true'} /></Col>
                <Col lg={11}><label>True</label> </Col>
            </Row>

            <Row>
                <Col lg={1}>
                    <RadioButton id='booleanQuestionFalse' data-testid='booleanQuestionFalse'
                        onChange={handleOnChange} value={'false'} checked={answer === 'false'} /> </Col>
                <Col lg={11}><label>False</label> </Col>
            </Row>
        </div>
    )
}

BooleanQuestion.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    answer: PropTypes.string.isRequired
}

export default BooleanQuestion
