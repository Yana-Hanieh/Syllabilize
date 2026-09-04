import React from 'react'
import TextInput from './TextInput'
import TabButton from './TabButton';

function MessagePopup({attributes, initialValues=Boolean, required, coursesOptions, classroomOptions, onsubmit, className=''}) {
  return (
    // bg-white dark:bg-neutral-800 
    <div className='bg-primary rounded-xl p-4 w-3/4 grid grid-cols-2 gap-2'>
        
        {attributes.map((a, index) => {
           
            const display =
                    <TextInput 
                        type={a.type }
                        placeholder={`${a.label}`}
                        value={initialValues}
                        onChange={onsubmit}
                        required={required}
                        courseOptions={coursesOptions}
                        classroomOptions={classroomOptions}
                        key={index}
                        className='bg-neutral-100 dark:bg-white border-neutral-300 dark:border-neutral-700 rounded-md'
                    />
            return (display)
        })}

    </div>
  )
}

export default MessagePopup