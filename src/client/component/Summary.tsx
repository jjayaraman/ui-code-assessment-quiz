import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { ISummary } from './../types/index'

export const Summary = (props) => {
    const { summary } = props
    return (
        <div>
            <Card title='Summary'  >
                <div className='content'>
                    <br />
                    <label>Correct</label> {summary.correct}
                    <label>Wrong</label> {summary.wrong}
                    <label>Questions Answered</label> {summary.questionsAnswered}
                    <label>Score</label> {summary.score}

                    <Button label="Restart" onClick={props.restart} className="p-button-warning" />
                </div>
            </Card>
        </div>
    )
}

export default Summary
