import React from 'react'
import TabButton from '../reusableUiComponents/TabButton'
import { MdDelete, MdEdit } from "react-icons/md";

function InfoCards({pfp, fields = [], role = 'admin', onDelete, onEdit}) {
  return (
        <div className='border border-neutral-300 bg-neutral-100 dark:text-neutral-800 dark:shadow-neutral-100 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-row gap-4 p-6 justify-between'>
            {/* card content area */}
            <div className="flex-1 flex flex-col sm:grid sm:justify-items-center gap-2"
                style={{ gridTemplateColumns: `repeat(${fields.length}, minmax(0,1fr))`}}>
                    {fields.map(field => {
                        const displayValue = Array.isArray(field.value) ? field.value.join(', ') : field.value;
                        return (
                            <h3 key={field.key} className='truncate w-full text-center'>
                                {displayValue}
                            </h3>
                        )
                    })}
            </div>

            {/*delete and modify buttons (for admin only) */}
            {role === 'admin' &&(
                <div className="flex flex-row shrink-0 ml-2">
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