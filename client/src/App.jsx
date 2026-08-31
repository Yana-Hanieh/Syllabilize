import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  
  return (
    <div className="bg-neutral-100 min-h-screen">
      {/* sidebar */}
      {/* searchbar */}
      <div className="">
        <Routes>
          {/* default route */}
          <Route path='/' element={<Navigate to ='/auth/login' replace/>} />

          <Route path ='/login' element ={<LoginPage/>}/>

          <Route path='/admin' element={<Navigate to='admin/students' replace/>} /> 
          <Route path='/student' element={<Navigate to='student/courses' replace/>} />

          {/* routes the user to the dashboard based on their respective role */}
          <Route path='/admin/*' element={<DashboardPage role='admin'/>} /> 
          <Route path='/student/*' element={<DashboardPage role='student'/>} />

          {/* fallback for unhandled routes */}
          <Route path='*' element={<Navigate to='/login' replace/>} />

        </Routes>
      </div>
    </div>
  )
}

export default App
