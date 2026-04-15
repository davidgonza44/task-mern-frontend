import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskService from './taskService'

const initialState = {
    tasks : [],
    isSuccess : false,
    isError: false,
    isLoading: false,
    message: ''
}

export const createTask = createAsyncThunk(
    '/tasks/create', async (taskData, thunkApi) => {
        try{
            const token = thunkApi.getState().auth.user.token
            return await taskService.createTask(taskData, token)
        } catch (error){
            const message = error?.response?.data?.message || error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getTasks = createAsyncThunk(
    '/tasks/getAll', async (_, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user.token
            return await taskService.getTasks(token)
        } catch (error) {
            const message = error?.response?.data?.message || error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const deleteTask = createAsyncThunk(
    'tasks/delete', async (id, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user.token
            return await taskService.deleteTask(id, token)
        } catch (error) {
            const message = error?.response?.data?.message || error.message || error ?.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks.push(action.payload)
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ''
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.tasks = action.payload
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = ''
            })
            .addCase(deleteTask.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
                state.message = ''
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isError = false
                state.isLoading = false
                state.tasks = state.tasks.filter(
                    (task) => task._id !== action.payload
                )
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isSuccess = false
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
    }
})


export const { reset } = taskSlice.actions
export default taskSlice.reducer