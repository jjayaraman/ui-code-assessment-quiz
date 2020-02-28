import React, { useState, useEffect } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'

import QuizService from '../service/QuizService'
import { Question } from './../types/index';

export const Quiz = () => {

  let service = new QuizService()
  const [questions, setQuestions] = useState<Question[]>([])
  const [question, setQuestion] = useState<Question>()
  const [answer, setAnswer] = useState({})

  useEffect(() => {
    service.getQuestions().then(res => {
      setQuestions(res.data.results)
    })
  }, [])

  const next = () => {

    setQuestion(questions[Math.floor(Math.random() * 49)])
  }

  // Typescript strict mode
  interface ChangeCheckboxEvent extends MouseEvent {
    target: HTMLInputElement
  }

  const handleOnChange = (e: any) => {
    const { id, value } = e.target
    setAnswer({ id: value })
  }

  const footer = <span>
    <Button label="Next" onClick={next} icon="pi pi-check" style={{ marginRight: '.25em' }} />
  </span>;

  return (
    <div>
      <Card title='Question' footer={footer} >
        <div className='content'>

          <label>{question?.question}</label>
          <br /><br />

          {question?.type == 'multiple' &&
            question?.incorrect_answers.map(a => {
              return (
                <div>
                  <RadioButton id='multiple' onChange={handleOnChange} />
                  <label>{a}</label>
                </div>)
            }
            )}

          {question?.type == 'text' && <input id='text' type='text' onChange={handleOnChange} ></input>}
        </div>

      </Card>


    </div>
  )
}
