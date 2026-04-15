import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { vi } from 'vitest'
import { getTasks } from "../features/tasks/taskSlice"
import taskReducer from "../features/tasks/taskSlice"
import authReducer from "../features/auth/authSlice"
import taskService from "../features/tasks/taskService"





const mock = new MockAdapter(axios)

describe('task slice', () => {
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer : {
            task: taskReducer,
            auth: authReducer
        },
        preloadedState: {
            task: {
                tasks : [],
                isSuccess: false,
                isLoading: false,
                isError: false,
                message: ''
            },
            auth:{
                user: { token: 'mock_token'}
            }
        }
    }
)
    })

    afterEach(() => mock.reset())

    test("Calls the taskService to fetch tasks", async () => {
        const token = "mock_token"
        const tasks = [
            {
                '_id' : '69cf42d00f15468ca8b372f3', 
                'text': 'cocinar',
                'user': '69d422ec7d4f24037f1c989e',
                'createdAt': '2026-04-08T23:05:10.024+00:00',
                'updatedAt':'2026-04-08T23:05:10.024+00:00',
                "__v" : "0"
            }
        ]


        const getTasksSpy = vi.spyOn(taskService, 'getTasks').mockResolvedValue(tasks)
        await store.dispatch(getTasks()) // el thunk saca el token directamente de store

        expect(getTasksSpy).toHaveBeenCalledWith(token)

    })
})