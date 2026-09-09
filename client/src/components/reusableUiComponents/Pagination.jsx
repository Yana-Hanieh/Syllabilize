import React from 'react'
import TabButton from './TabButton'
import { IoArrowBack,IoArrowForward } from "react-icons/io5";

function Pagination({page, totalPages, setPage}) {
    const handlePrevious = () => {
        if (page>1){
            setPage(page-1)
        }
    };

    const handleNext = () => {
        if (page<totalPages){
            setPage(page+1)
        }
    };

    return (
        <div className='flex flex-row gap-5 p-3 items-center'>
            <TabButton 
                type='button'
                onClick={handlePrevious}
                icon={IoArrowBack}
                disabled={page<=1}
            />
            <span className="text-sm dark:text-gray-300 w-full">
                Page {page} of {totalPages}
            </span>
            <TabButton 
                type='button'
                onClick={handleNext}
                icon={IoArrowForward}
                disabled={page>=totalPages}
            />
        </div>
    )
}

export default Pagination