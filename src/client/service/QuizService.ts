import axios from 'axios'

/**
 * Quiz service to call the API
 * 
 * @author Jayakumar Jayraman
 */
export default class QuizService {

  getQuestions(): Promise<any> {
    return axios.get('http://localhost:4000/api/questions')
  }
}
