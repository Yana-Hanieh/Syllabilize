import React from 'react'
import TextInput from './TextInput'
import TabButton from './TabButton';
import { TiCancel } from "react-icons/ti";

function MessagePopup({attributes, initialValues=Boolean, required, coursesOptions, classroomOptions, onClose, onSubmit, className=''}) {
  return (
    // 
    <div className='bg-neutral-100 dark:bg-white rounded-xl p-4 w-3/4 grid grid-cols-2 gap-2'>
        <TabButton 
            type='button'
            icon={<TiCancel className="text-red-500 text-2xl"/>}
            onClick={onClose}
            variant="danger"
            className='col-span-2 w-fit! p-1! ml-auto '
        />
        
        {attributes.map((a, index) => {
           
            const display =
                    <TextInput 
                        type={a.type }
                        placeholder={`${a.label}`}
                        value={initialValues}
                        onChange={onSubmit}
                        required={required}
                        courseOptions={coursesOptions}
                        classroomOptions={classroomOptions}
                        key={index}
                        className='bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 rounded-md'
                    />
            return (display)
        })}

    </div>
  )
}

export default MessagePopup