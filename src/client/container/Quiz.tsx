import React, { useEffect, useState } from 'react'
import QuizService from '../service/QuizService'
import { Question, QuestionType } from '../types/Question'
import Multiple from '../component/Multiple'

export interface QuizProps { }

export const Quiz = (props: QuizProps) => {

    const quizService = new QuizService()

    const [questions, setQuestions] = useState<Question[]>([])
    const [question, setQuestion] = useState<Question>()

    useEffect(() => {
        quizService.getQuestions().then(res => {
            setQuestions(res.data.results)
        })
    }, [])

    let getRandomQuestion = () => {


        setQuestion(questions[Math.floor(Math.random() * 49)])
        console.log(QuestionType.multiple);

        console.log('clicked..', question);
    }


    return (
        <div>
            {question && question.type == QuestionType.multiple &&
                <Multiple question={question} />}

            <input type='button' onClick={getRandomQuestion} value='Next'></input>
            Debugger ::: <pre>{JSON.stringify(question, null, 2)}</pre>
        </div>
    )
}
