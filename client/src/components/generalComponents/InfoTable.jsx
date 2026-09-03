import React from 'react'
import TabButton from '../reusableUiComponents/TabButton'
import { CgProfile } from "react-icons/cg";
import { MdDelete, MdEdit } from "react-icons/md";

function InfoTable({attributes=[],items=[],itemType='items', role='admin', onDeleteItem, onEditItem}) {
    if(!items || items.length === 0 ){
            return(
                <div className="w-full bg-white dark:bg-neutral-200 border border-neutral-200 rounded-xl text-neutral-800 text-center p-10">
                    no {itemType} found
                </div>
            )
    }
    return (
        <div className=" h-fit w-full overflow-scroll ">
            <table className="border border-neutral-300 rounded-2xl w-full">
                <thead className=' border-b-2 border-red-700'>
                    {/* tr: element that defines a table row*/}
                    <tr className='bg-neutral-100 dark:bg-neutral-800'>
                        {attributes.map(attribute => (
                            //th:element that defines a table header (the data inside the header)
                            <th key={attribute.key} className="p-3 text-left"> {attribute.label}</th> 
                        ))}
                        {role === 'admin' && <th className="p-3"> Actions</th> }
                    </tr>
                </thead>

                {/* tbody: elemeent that defines the table body container (table header cell) */}
                <tbody> 
                    {items.map((item, index) => {
                        const attributeId = attributes.find(a=>a.key === 'id'); //find the attribute definition for id to be used as a unique row key
                        const rowId = attributeId ? attributeId.value(item) : index; //use the item's custome id, otherwise use the array index as a fallback

                        return(
                            //tr: element that defines a table row
                            <tr key={rowId} className="border-t border-neutral-200 dark:text-neutral-800"> 

                                {/* checking pfp */}
                                {attributes.map( a => { //map through the attribute array, and take 'a' as each attribute object (a is an object: {key: 'id', label:'ID', value: (item) => item.studentId})
                                    const val = a.value(item); //saves each object value in a val variable 
                                    if ( a.key === 'pfp') { //check if the key value of the 'a' object is a pfp 
                                        return (
                                            //td is the information displayed inside the table (table data)
                                            <td key={a.key} className="p-3"> 
                                                {val ? ( //if a valid image url exists, render it
                                                    <img src={val} 
                                                    alt="profile" 
                                                    className="w-10 h-10 rounded-full object-cover" />
                                                ) : ( //if no valid url available, display a default profile icon
                                                    <CgProfile className="w-10 h-10 rounded-full text-neutral-500" />
                                                )}
                                            </td>
                                        );
                                    }
                                    if(a.key === 'classroom'){
                                        // console.log('ahhhs', item)
                                        const val = a?.value(item)
                                        // console.log('val', val)
                                        return (
                                            <td className=' min-w-[30px] '>
                                                {
                                                    item?.Classroom?.classroomName
                                                }
                                            </td>
                                        )
                                    }
                                    if(a.key === 'Course'){
                                        const val = a?.value(item)
                                        return(
                                            <td className=' min-w-[30px]'>
                                                {
                                                    item?.Courses.courseName
                                                }
                                            </td>
                                        )
                                    }

                                    const display = Array.isArray(val) ? val.join(', ') : val; // if value is an array, join the items into a comma-separated string, otherwise use it as it is
                                    return <td key={ a.key} className="p-3 min-w-[150px]">{display}</td>; //render the formatted value inside a standard table data cell
                                })}

                                {/* Delete and Edit Action Buttons */}
                                {role === 'admin' && ( //if the user's role is an admin, he can access the action buttons 
                                    <td className="p-3 flex gap-2">
                                        <TabButton 
                                            onClick={() => onDeleteItem(item)}
                                            title="Delete Item"
                                            variant='danger'
                                            className='px-2 hover:bg-white dark:hover:bg-neutral-200'
                                            icon={<MdDelete className='text-lg'/>}
                                        />

                                        <TabButton 
                                            onClick={() => onEditItem(item)}
                                            title="Edit Item"
                                            className='px-2!'
                                            icon={<MdEdit className='text-lg'/>}
                                        />
                                    </td>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table> 
        </div>
    )
}

export default InfoTable