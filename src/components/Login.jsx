import { useState } from "react"
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import Spinner from "./Spinner"
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify"

const Login = () =>{
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const {email, password } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user)
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
        
    }

    const { isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)
    useEffect(() => {
        if (isError){
            toast.error(message)
            console.log('entro')
        }
        if (isSuccess || user){
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message]) 


    return(
        isLoading ? <Spinner/> :
        (<div>
            <section className='heading'>
                <h1><FaSignInAlt/> Login</h1>
                <p>Please login to your account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input 
                            type="email"
                            placeholder="Enter your email:"
                            name="email"
                            value={email}
                            id="email"
                            onChange={onChange}
                            className="form-control"                       
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password"
                            placeholder="Enter your password:"
                            name="password"
                            value={password}
                            id="email"
                            onChange={onChange}
                            className="form-control"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-block"
                    >
                        Submit
                    </button>
                </form>
            </section>
        </div>)
    )
}

export default Login