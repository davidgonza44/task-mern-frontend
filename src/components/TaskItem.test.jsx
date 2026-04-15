import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from '@testing-library/react'
import { Provider } from "react-redux";
import TaskItem from "./TaskItem";
import { test } from "vitest";
import authReducer from "../features/auth/authSlice"
import taskReducer from '../features/tasks/taskSlice'

describe('TaskItem', () => {
    const task = {
        _id: 'task-123',
        createdAt: '2023-07-09T10:00:00',
        text: 'Learn Blockchain'
    }

    const store = configureStore({
        reducer: {
            task: taskReducer,
            auth: authReducer
        }
    }) 

    test('render task details correctly', () => {
        render(
            <Provider store={store}>
                <TaskItem task={task} />
            </Provider>
        )
        expect(screen.getByText(task.text)).toBeInTheDocument()
        expect(screen.getByText(new Date(task.createdAt).toLocaleString('en-US'))).toBeInTheDocument()
    })
}) 



// Si no existiera store, un componente que dependa de Redux podría fallar al renderizar en el test.