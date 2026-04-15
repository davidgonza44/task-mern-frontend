import axios from 'axios'
const API_URL = '/api/tasks'

const createTask = async (taskData, token) => {  
    const response = await axios.post(API_URL, taskData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

const getTasks = async (token) => {
    const response = await axios.get(API_URL,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

const deleteTask = async (id, token) => {
    const response = await axios.delete(API_URL + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

const taskService = {
    createTask,
    getTasks,
    deleteTask
}
export default taskService