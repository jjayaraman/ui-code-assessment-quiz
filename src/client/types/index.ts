/**
 * Type definitions for the Quiz
 * 
 * @author Jayakumar Jayaraman
 * 
 */
export interface Question {
  category: string,
  type: QuestionType,
  difficulty: Difficulty,
  question: string,
  correct_answer: string,
  incorrect_answers: Array<string>
}

export enum QuestionType {
  multiple = 'multiple',
  boolean = 'boolean',
  text = 'text'
}

export enum Difficulty {
  'easy', 'medium', 'hard'
}

export interface ISummary {
  correct: number,
  wrong: number,
  questionsAnswered: number,
  score: string
}