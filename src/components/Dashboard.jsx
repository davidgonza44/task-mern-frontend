import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TaskForm from './TaskForm'

const Dashboard = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    useEffect(() => {
        if (!user){
            navigate('/login')
        }
    }, [user, navigate])

    if (!user) return null // lo de abajo nunca se ejecuta

    const onClick = () => {
        navigate('/allTasks')
    }
    return (
        <div>
            <section className='heading'>
                <h1>Welcome, {user.name}!</h1>
                <p>Tasks Dashboard</p>
            </section>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    className='btn'
                    onClick={onClick}
                >
                    Check Tasks
                </button>
            </div>
            <TaskForm />
        </div>
    )
}

export default Dashboard