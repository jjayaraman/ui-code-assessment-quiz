import axios from 'axios'
import { Question } from '../types/Question';

export default class QuizService {

    getQuestions(): Promise<any> {
        return axios.get('http://localhost:4000/api/questions')
    }
}