import React from 'react'
import TabButton from './TabButton'

function ConfirmationMessage({onSubmit, onClose, itemToDelete}) {
    const displayName = typeof itemToDelete === 'object' && itemToDelete !== null 
        ? itemToDelete.userName || itemToDelete.courseName || itemToDelete.classroomName || 'this item'
        : itemToDelete || 'this item';
  return (
    <div className='rounded-xl bg-neutral-100 dark:bg-white justify-items-center p-4 '>
        <h1> Are you sure you want to delete {displayName}?</h1>
       <div className="flex flex-row gap-8 pt-2"> 
            <TabButton 
                onClick={onSubmit}
                variant='danger'
                label='Yes'
                className='w-fit! rounded-xl! px-3!'
            />
            <TabButton 
                onClick={onClose}
                variant='default'
                label='No'
                className='w-fit! text-black! hover:bg-primary-light rounded-xl! px-3!'
            />
         </div>
    </div> 
  )
}

export default ConfirmationMessage