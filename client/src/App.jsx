import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className="min-h-screen">
      {/* sidebar */}
      {/* searchbar */}
      <div className="">
        <Routes>
          {/* default route */}
          <Route path='/' element={<Navigate to ='/login'/>} />

          <Route path ='/login' element ={<LoginPage/>}/>

          {/* routes the user to the dashboard based on their respective role */}
          <Route path='/admin/dashboard' element={<DashboardPage role='admin'/>} /> 
          <Route path='/student/dashboard' element={<DashboardPage role='student'/>} />

          {/* fallback for unhandled routes */}
          <Route path='*' element={<Navigate to='login' replace/>} />

        </Routes>
      </div>
    </div>
  )
}

export default App
