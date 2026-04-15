import axios from "axios";
import MockAdapter from "axios-mock-adapter"
import taskService from "../features/tasks/taskService";
// url correcta. headers. manejo de respuestas y errores
const mock = new MockAdapter(axios)

describe('taskService', async() => {
    afterEach(() => {
        mock.reset()
    })
    test('fetches tasks successfully' , async() => {
        const token = 'mock_token'
        const tasks = [
            {
                _id: '',
                text: '',
                user: '',
                createdAt: '',
                updatedAt: '',
                __v: ''
            }
        ]
        // simulas que el backend manda tasks
        mock.onGet('/api/tasks').reply(200, tasks) //"si alguien hace GET /api/tasks con este token responde con 200 y este array de tasks
        // el service los recibe y los retorna
        const response = await taskService.getTasks(token)
        // verificas que llegaron igual, sin modificaciones. Osea que el service no los perdio, modifico o rompio en el camino
        expect(response).toEqual(tasks)
    })
})