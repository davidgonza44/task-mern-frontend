import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Spinner from "./Spinner"
import { getTasks } from "../features/tasks/taskSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { reset } from "../features/tasks/taskSlice"
import TaskItem from "./TaskItem"

const TaskList = () => {
    const dispatch = useDispatch()
    const { tasks, isSuccess, isError, isLoading, message} = useSelector((state) => state.task)
    const navigate = useNavigate()
    useEffect(() => {
        if (isError){
            toast.error(message)
        }
        dispatch(getTasks())
        return () => {
            dispatch(reset())
        }
    }, [])
    return(
        <div>
            {
            isLoading ? <Spinner /> : (
                <div>
                    <h1>All Tasks</h1>
                    <section className="tasks">
                        {tasks.map((task)=> (
                                <div key={task._id}  className="task" >
                                    <TaskItem task={task}/>
                                </div>               
                        ))}
                    </section>
                </div>
            )
            } 
        </div>
    )
}

export default TaskList