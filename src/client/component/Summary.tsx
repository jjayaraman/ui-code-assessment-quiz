import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Container, Row, Col } from 'react-bootstrap'
import { ISummary } from './../types/index'

/**
 * Functional component for Summary 
 * 
 * @author Jayakumar Jayaraman 
 */
export const Summary = (props: any) => {

    const summary: ISummary = props.history.location.state

    const home = () => {
        props.history.push('/')
    }

    const footer = <span>
        <Button label="Restart Quiz" onClick={home} />
    </span>;

    return (
        <div>
            <Card title='SUMMARY' footer={footer} >
                <div className='content'>

                    <br />
                    <Container>
                        <Row>
                            <Col lg={6}><label>Correct</label> </Col>
                            <Col lg={6}>{summary.correct}</Col>
                        </Row>
                        <Row>
                            <Col lg={6}><label>Wrong</label> </Col>
                            <Col lg={6}>{summary.wrong}</Col>
                        </Row>
                        <Row>
                            <Col lg={6}><label>Questions Answered</label> </Col>
                            <Col lg={6}>{summary.questionsAnswered}</Col>
                        </Row>
                        <Row>
                            <Col lg={6}><label>Final Score</label> </Col>
                            <Col lg={6}>{summary.score}</Col>
                        </Row>

                    </Container>

                </div>
            </Card>
        </div>
    )
}

export default Summary
