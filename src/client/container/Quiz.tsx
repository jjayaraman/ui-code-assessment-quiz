import React, { useState, useEffect } from 'react'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'

import QuizService from '../service/QuizService'
import { Question, ISummary } from './../types/index';

import { useHistory } from 'react-router-dom'
import { Row, Container, Col } from 'react-bootstrap';

export const Quiz = () => {

  const history = useHistory()
  let service = new QuizService()

  // Initial state
  let initialSummaryState: ISummary = {
    correct: 0,
    wrong: 0,
    questionsAnswered: 0,
    score: '0%'
  }

  // States
  const [questions, setQuestions] = useState<Question[]>([])
  const [question, setQuestion] = useState<Question>()
  const [answer, setAnswer] = useState<string>('')
  const [summary, setSummary] = useState<ISummary>(initialSummaryState)

  // Hook for API call
  useEffect(() => {
    service.getQuestions().then(res => {
      const questions = res.data.results
      setQuestions(questions)
      setQuestion(questions[Math.floor(Math.random() * 49)])
    })
  }, [])

  // handle onChange events
  const handleOnChange = (e: any) => {
    const { id, value } = e.target
    setAnswer(value)
  }

  // Next button action
  const next = () => {
    validateQuestions()
    setQuestion(questions[Math.floor(Math.random() * 49)])     // Set next question
  }

  // Finish quiz and show summary page
  const finish = () => {
    validateQuestions().then(sum => {
      console.log('Validation done', sum, summary);
      setSummary(sum)
      history.push('/summary', sum)
    })

  }

  // Validate the answer and update the summary
  const validateQuestions = () => new Promise<ISummary>((resolve, reject) => {
    let tempSummary = { ...summary }
    tempSummary.questionsAnswered = tempSummary.questionsAnswered + 1
    if (question?.correct_answer.trim().toLowerCase() === answer?.trim().toLowerCase()) {
      tempSummary.correct = tempSummary.correct + 1
    }
    else {
      tempSummary.wrong = tempSummary.wrong + 1
    }
    tempSummary.score = ((tempSummary.correct / tempSummary.questionsAnswered) * 100).toFixed(0) + '%'
    setSummary((previousState) => ({ ...previousState, ...tempSummary }))
    console.log('Summary :', summary, tempSummary);
    resolve(tempSummary)
  })


  const footer = <span>
    <Button label="Next" onClick={next} style={{ marginRight: '.25em' }} />
    <Button label="Finish" onClick={finish} className="p-button-success" style={{ marginRight: '.25em' }} />
  </span>;

  return (
    <div>
      <Card title='Question' footer={footer} >
        <div className='content'>
          <Container>
            <Row>
              <Col lg={12}><label>{question?.question}</label> </Col>
            </Row>
            <br />

            {question?.type == 'multiple' &&
              question?.incorrect_answers.concat(question.correct_answer).sort().map(a => {
                return (
                  <div key={a}>
                    <Row>
                      <Col lg={1}>
                        <RadioButton id='multiple' onChange={handleOnChange} value={a} checked={answer === a} />
                      </Col>
                      <Col lg={11}>
                        <label>{a}</label>
                      </Col>
                    </Row>
                  </div>)
              })
            }

            {question?.type == 'boolean' &&
              <div>
                <Row>
                  <Col lg={1}><RadioButton onChange={handleOnChange} value={'true'} checked={answer === 'true'} /></Col>
                  <Col lg={11}><label>True</label> </Col>
                </Row>

                <Row>
                  <Col lg={1}>
                    <RadioButton onChange={handleOnChange} value={'false'} checked={answer === 'false'} /> </Col>
                  <Col lg={11}><label>False</label> </Col>
                </Row>
              </div>
            }

            {question?.type == 'text' &&
              <Row>
                <Col lg={12}>
                  <InputText onChange={handleOnChange} style={{ width: '100%' }} />
                </Col>
              </Row>
            }

          </Container>
        </div>
      </Card>


      {/*    Debugger:::
   <pre>{JSON.stringify(question, null, 2)}</pre>
      <pre>{JSON.stringify(answer, null, 2)}</pre> 
      <pre>{JSON.stringify(summary, null, 2)}</pre> */}

    </div >
  )
}
