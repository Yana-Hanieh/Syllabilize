import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function SideBar() {
  const [selected, setSelected] = useState('Students')
  return (
    <div className='rounded rounded-xl bg-white w-1/5 flex flex-col gap-4 p-6 h-full'>
      <button 
        type ="button"
        onClick={() => setRole('student')}
        className={`flex-1 py-2 rounded-full text-md font-medium transition-colors cursor-pointer hover:bg-secondary ${selected} ? bg-primary: bg-neutral-100`}>
        Student
      </button>
      <button 
        type ="button"
        onClick={() => setRole('student')}
        className={`flex-1 py-2 rounded-full text-md font-medium transition-colors cursor-pointer hover:bg-secondary ${selected} ? bg-primary: bg-neutral-100`}>
        Courses
      </button>
      <button 
        type ="button"
        onClick={() => setRole('student')}
        className={`flex-1 py-2 rounded-full text-md font-medium transition-colors cursor-pointer hover:bg-secondary ${selected} ? bg-primary: bg-neutral-100`}>
        Classrooms
      </button>

    </div>
  )
}

export default SideBar
