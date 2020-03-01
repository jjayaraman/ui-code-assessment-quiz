import React, { useState, useEffect } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button'
import { Row, Container, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import QuizService from '../service/QuizService'
import { Question, ISummary } from './../types/index';
import Multiple from '../component/Multiple';
import BooleanQuestion from '../component/BooleanQuestion';
import TextQuestion from '../component/TextQuestion';
import * as yup from 'yup'
const unescape = require('recursive-unescape');
//import { unescape } from './../utils/Utils'


/**
 * Container component for Quiz
 * 
 * @author Jayakumar Jayaraman 
 */
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
  const [error, setError] = useState<String>('')

  // Hook for API call
  useEffect(() => {
    service.getQuestions().then(res => {
      const questions = res.data.results
      setQuestions(unescape(questions))
      setQuestion(unescape(questions)[Math.floor(Math.random() * 49)])
    })
  }, [])

  // handle onChange events
  const handleOnChange = (e: any) => {
    const { value } = e.target

    setAnswer(value)
    if (value) {
      setError('')
    }
  }

  // Next button action
  const next = () => {
    validateQuestions().then(res => {
      setQuestion(questions[Math.floor(Math.random() * 49)])     // Set next question
    }).catch(err => {
    })
  }

  // Finish quiz and show summary page
  const finish = () => {
    validateQuestions().then(sum => {
      //      console.log('Validation done', sum, summary);
      setSummary(sum)
      history.push('/summary', sum)
    })
      .catch(err => {
      })

  }

  // Yup schema for form validation
  let yupSchema = yup.object().shape(
    { answer: yup.string().required('Answer is required.') }
  )


  // Validate the answer and update the summary
  const validateQuestions = () => new Promise<ISummary>((resolve, reject) => {

    // Form validation using Yup
    yupSchema.validate({ answer }).then(res => {
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
      setAnswer('')
      setError('')
      //console.log('Summary :', summary, tempSummary);
      resolve(tempSummary)
    })
      .catch(err => {
        setError('Please answer the question.')
        reject(err)
      })

  })


  const footer = <span>
    <Button label="Next" onClick={next} style={{ marginRight: '.25em' }} />
    <Button label="Finish" onClick={finish} className="p-button-success" style={{ marginRight: '.25em' }} />
  </span>;

  return (
    <div>
      <Card title='Question' footer={footer} >
        <div className='content'>
          <form data-testid='quizForm' >
            <Container>
              <Row>
                <Col lg={12}><label className='required'>{question?.question}</label> </Col>
              </Row>
              <br />

              {question?.type === 'multiple' &&
                <Multiple question={question} answer={answer} handleOnChange={handleOnChange} />
              }

              {question?.type === 'boolean' &&
                <BooleanQuestion answer={answer} handleOnChange={handleOnChange} />
              }

              {question?.type === 'text' &&
                <TextQuestion handleOnChange={handleOnChange} />
              }
              <Row>
                <Col lg={12} className='error'> {error}</Col>
              </Row>

            </Container>
          </form>
        </div>
      </Card>

      {/* 
      Debugger:::
    <pre>{JSON.stringify(question, null, 2)}</pre>
      <pre>{JSON.stringify(answer, null, 2)}</pre>
      <pre>{JSON.stringify(summary, null, 2)}</pre>
      <pre>{JSON.stringify(error, null, 2)}</pre> */}
    </div >
  )
}
