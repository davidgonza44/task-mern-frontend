import { useDispatch } from "react-redux"
import { deleteTask } from "../features/tasks/taskSlice"
const TaskItem = ({ task }) => {
    const dispatch  = useDispatch()
    const id = task._id
    return (
        <>  
            <div>{new Date(task.createdAt).toLocaleString()}</div>
            <h3>{task.text}</h3>
            <button onClick={() => dispatch(deleteTask(id))} className="close">X</button>
        </>      
        
    )
}

export default TaskItem