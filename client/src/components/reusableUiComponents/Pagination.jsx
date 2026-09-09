import React from 'react'
import TabButton from './TabButton'
import { IoArrowBack,IoArrowForward } from "react-icons/io5";

function Pagination({page, totalPages, setPage}) {
  return (
        <div className='flex flex-row gap-5 p-3 items-center'>
            <TabButton 
                onClick={console.log('back')}
                icon={IoArrowBack}
            />
            <span className="text-sm dark:text-gray-300">
                Page {page} of {totalPages}
            </span>
            <TabButton 
                onClick={console.log('next')}
                icon={IoArrowForward}
            />
        </div>
  )
}

export default Pagination