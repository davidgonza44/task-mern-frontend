import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../features/tasks/taskSlice'
import { useNavigate } from 'react-router-dom'

const TaskForm = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTask({text}))
        setText('')
        navigate('/allTasks')
    }
    const onChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='text' style={{ fontWeight: 'bolder' }}>
                            Enter Task
                        </label>
                        <input type='text' value={text} onChange={onChange} name='task' id='text'/> 
                    </div>
                    <button type='submit' className='btn btn-block'>
                        Add Task
                    </button>
                </form>
            </section>
        </div>
    )
}

export default TaskForm