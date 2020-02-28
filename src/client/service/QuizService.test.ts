import QuizService from './QuizService'

it('test quiz serviec API', async (done) => {
    const response = await new QuizService().getQuestions()
    expect(response).toBeTruthy()
    expect(response.status).toBe(200)
    expect(response.data).toBeTruthy()
    expect(response.data.results).toBeTruthy()
    expect(response.data.results.length).toBe(50)
    done()
})