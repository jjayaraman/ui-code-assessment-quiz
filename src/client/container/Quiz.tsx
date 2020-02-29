import React, { useState, useEffect } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'

import QuizService from '../service/QuizService'
import { Question } from './../types/index';

export const Quiz = () => {

  let service = new QuizService()
  //let isRestart: boolean = false


  // Initial state
  let initialSummaryState = {
    correct: 0,
    wrong: 0,
    questionsAnswered: 0,
    score: '0%'
  }

  // State
  const [questions, setQuestions] = useState<Question[]>([])
  const [question, setQuestion] = useState<Question>()
  const [answer, setAnswer] = useState('')
  const [summary, setSummary] = useState(initialSummaryState)
  const [restartToggle, setRestartToggle] = useState(false)


  // Hook for API call
  useEffect(() => {
    service.getQuestions().then(res => {
      const questions = res.data.results
      setQuestions(questions)
      setQuestion(questions[Math.floor(Math.random() * 49)])
    })
  }, [])

  // Hook to restart and clear old status
  useEffect(() => {
    setSummary(initialSummaryState)
    setQuestion(questions[Math.floor(Math.random() * 49)])
  }, [restartToggle])

  // handle onChange events
  const handleOnChange = (e: any) => {
    const { id, value } = e.target
    setAnswer(value)
  }

  // Next button action
  const next = () => {

    // Validate the answer and set the summary
    let tempSummary = { ...summary }
    tempSummary.questionsAnswered = tempSummary.questionsAnswered + 1
    if (question?.correct_answer.trim().toLowerCase() === answer?.trim().toLowerCase()) {
      tempSummary.correct = tempSummary.correct + 1
    }
    else {
      tempSummary.wrong = tempSummary.wrong + 1
    }
    tempSummary.score = ((tempSummary.correct / tempSummary.questionsAnswered) * 100).toFixed(0) + '%'
    setSummary(tempSummary)

    // Set next question
    setQuestion(questions[Math.floor(Math.random() * 49)])
  }

  const finish = () => {
    console.log('finished');
  }

  const restart = () => {
    setRestartToggle(!restartToggle)
  }

  const footer = <span>
    <Button label="Next" onClick={next} style={{ marginRight: '.25em' }} />
    <Button label="Finish" onClick={finish} className="p-button-success" style={{ marginRight: '.25em' }} />
    <Button label="Restart" onClick={restart} className="p-button-warning" style={{ marginRight: '.25em' }} />
  </span>;

  return (
    <div>
      <Card title='Question' footer={footer} >
        <div className='content'>

          <label>{question?.question}</label>
          <br /><br />

          {question?.type == 'multiple' &&
            question?.incorrect_answers.concat(question.correct_answer).sort().map(a => {
              return (
                <div key={a}>
                  <RadioButton id='multiple' onChange={handleOnChange} value={a} checked={answer === a} />
                  <label>{a}</label>
                </div>)
            })
          }

          {question?.type == 'boolean' &&
            <div>
              <RadioButton onChange={handleOnChange} value={'true'} checked={answer === 'true'} /> <label>True</label> <br />
              <RadioButton onChange={handleOnChange} value={'false'} checked={answer === 'false'} /> <label>False</label> <br />
            </div>
          }

          {question?.type == 'text' && <input id='text' type='text' onChange={handleOnChange} ></input>}

        </div>
      </Card>


      {/* Debugger:::
      <pre>{JSON.stringify(question, null, 2)}</pre>
      <pre>{JSON.stringify(answer, null, 2)}</pre>
      <pre>{JSON.stringify(summary, null, 2)}</pre> */}

    </div>
  )
}
