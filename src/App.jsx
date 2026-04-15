import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'  
import Register from './components/Register'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import TaskList from './components/TaskList'

function App() {
return (
<Router>
  <div className='container'>
    <Header />
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/allTasks' element={<TaskList />} />
    </Routes>
  </div>
  <ToastContainer />
</Router>
);
}

export default App
