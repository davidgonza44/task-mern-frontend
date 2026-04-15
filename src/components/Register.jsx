import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from './Spinner'



const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {name, email, password, password2} = formData
    const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth)
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }
    
    useEffect(() => {
        if (isError){
            toast.error(message)
        }
        if (isSuccess || user){
            navigate('/')
        }

        if (isSuccess || isError){
            dispatch(reset())
        }
    }, [user, isError, isSuccess, isLoading, message])

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2){
            toast.error('Passwords do not match')
            return
        } 
        const userData = {
                name, 
                email,
                password
            }
        console.log('hola')
        dispatch(register(userData)) //register crea la accion y dispatch la envia al store
        }

    return (
        isLoading ? <Spinner/> :
        (<div>
            <section className='heading'>
                <h1><FaUser/> Register</h1>
                <p>Please create an account</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Enter your name'
                            onChange={onChange}
                            name='name'
                            id='name'
                            value={name}
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type='email'
                            className='form-control'
                            placeholder='Enter your email:'
                            onChange={onChange}
                            name='email'
                            id='email'
                            value={email}
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type='password'
                            className='form-control'
                            placeholder='Enter your password:'
                            onChange={onChange}
                            name='password'
                            id='password'
                            value={password}
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type='password'
                            className='form-control'
                            placeholder='Enter your password:'
                            onChange={onChange}
                            name='password2'
                            id='password2'
                            value={password2}
                        />
                    </div>
                    <button 
                        type='submit'
                        className='btn btn-block'
                    >
                        Submit
                    </button>
                </form>
            </section>
        </div>)
    )}


export default Register