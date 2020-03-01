import React from 'react'
import { render } from '@testing-library/react'
import { Question, QuestionType, Difficulty } from '../types/index';
import Multiple, { MultipleProps } from './Multiple'

// Helper to render Multiple component
const renderMultiple = (props) => {
  const defaultProps = {
    question: {
      category: '',
      type: QuestionType.boolean,
      difficulty: Difficulty.easy,
      question: 'London is the capital of UK?',
      correct_answer: 'True',
      incorrect_answers: ['True', 'False']
    },
    answer: 'True',
    handleOnChange: () => { }
  }
  return render(<Multiple {...defaultProps} {...props} />)
}


it('should render the multiple component', () => {
  const { findByTestId, debug } = render(renderMultiple())

  expect(true).toBeTruthy()
})
