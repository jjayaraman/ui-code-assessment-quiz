import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { InputText } from 'primereact/inputtext'

/**
 * Functional component for Text question
 * 
 * @author Jayakumar Jayaraman * 
 */
const TextQuestion = (props: TextQuestionProps) => {
    const { handleOnChange } = props

    return (
        <div>
            <Row>
                <Col lg={12}>
                    <InputText id='textQuestion' data-testid='textQuestion' onChange={handleOnChange} style={{ width: '100%' }} />
                </Col>
            </Row>
        </div>
    )
}


export interface TextQuestionProps {
    handleOnChange: any
}

TextQuestion.propTypes = {
    handleOnChange: PropTypes.func.isRequired
}

export default TextQuestion
