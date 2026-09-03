import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/reusableUiComponents/DashboardLayout';
import StudentsPage from './pages/StudentsPage';
import CoursesPage from './pages/CoursesPage';
import ClassroomsPage from './pages/ClassroomsPage';

function App() {
  
  return (
    <div className="bg-neutral-100 min-h-screen">

        <Routes>
          {/* default route */}
          <Route path='/' element={<Navigate to ='login' replace/>} />

          <Route path ='/login' element ={<LoginPage/>}/>

          {/* admin routers */}
          <Route path='/admin' element={<DashboardLayout role='admin'/>}>
            {/* default admin path that redirets to students page */}
            <Route index element={<Navigate to ='students' replace/>} />
            <Route path='students' element={<StudentsPage role='admin'/>} />
            <Route path='courses' element={<CoursesPage role='admin'/>} />
            <Route path='classrooms' element={<ClassroomsPage role='admin'/>} />
          </Route>

          {/* student routers */}
          <Route path='/student' element={<DashboardLayout role='student'/>}>
            {/* default student path that redirects to students page */}
            <Route index element={<Navigate to ='courses' replace/>} />
            <Route path='courses' element={<CoursesPage role='student'/>} />
            <Route path='classrooms' element={<ClassroomsPage role='student'/>} />
          </Route>

          {/* fallback for unhandled routes */}
          <Route path='*' element={<Navigate to='/login' replace/>} />

        </Routes>

    </div>
  )
}

export default App
