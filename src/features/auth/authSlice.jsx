import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

let localUser = null
try {
    localUser = JSON.parse(localStorage.getItem('user') || null)
} catch {
    localUser = null
}


const initialState = {
    user: localUser ? localUser : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const register = createAsyncThunk(
    'auth/register', async (userData, thunkApI) => {
        try {
            return await authService.register(userData)
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString()
            return thunkApI.rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout', async() => {
        await authService.logout()
    }
)

export const login = createAsyncThunk(
    'auth/login', async (userData, thunkApI) => {
        try {
            return await authService.login(userData)
        } catch (error) {
            const message = error?.response?.data?.message || error.message || error.toString()
            return thunkApI.rejectWithValue(message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ''
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => { //usuario ya existe, error de servidor, faltan campos
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ''
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isSuccess = true
                state.isError = false
                state.isLoading = false
            })

        }
    }
)



export const { reset } = authSlice.actions
export default authSlice.reducer