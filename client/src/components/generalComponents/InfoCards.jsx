import React from 'react'
import TabButton from '../reusableUiComponents/TabButton'
import { MdDelete, MdEdit } from "react-icons/md";

function InfoCards({pfp, name, email, id, courses, classroom, role='admin', onDelete, onEdit}) {
    const formattedCourses = Array.isArray(courses) ? courses.join(', ') : courses;
    const formattedClassroom = Array.isArray(classroom) ? classroom.join(', ') : classroom;
    return (
        <div className='border border-neutral-300 bg-neutral-100 dark:text-neutral-800 dark:shadow-neutral-100  rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-row gap-4 justify-between p-6 '>
            {/* card content area */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h3>
                    {name}
                </h3>

                <h3>
                    {id}
                </h3>

                {email &&(
                    <h3>
                        {email}
                    </h3>
                )}

               {courses &&(
                    <h3>
                        {courses}
                    </h3>
                )}

               {classroom &&(
                    <h3>
                        {classroom}
                    </h3>
                )}
            </div>

            {/*delete and modify buttons (for admin only) */}
            {role === 'admin' &&(
                <div className="flex flex-row">
                  <TabButton 
                        onClick={onDelete}
                        title="Delete Item"
                        variant='danger'
                        className='px-2! hover:bg-white dark:hover:bg-neutral-200'
                        icon={<MdDelete className='text-lg'/>}
                    />

                    <TabButton 
                        onClick={onEdit}
                        title="Edit Item"
                        className='px-2!'
                        icon={<MdEdit className='text-lg'/>}
                    />

                </div>
            ) }
            
        </div>
   
  )
}

export default InfoCards