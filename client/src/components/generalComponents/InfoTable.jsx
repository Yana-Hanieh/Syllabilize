import React from 'react'
import TabButton from '../reusableUiComponents/TabButton'
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
    <table className="w-3/4 border border-neutral-300 rounded-2xl overflow-hidden">
        <thead>
            <tr className='bg-neutral-100 dark:bg-neutral-800'>
                {attributes.map(attribute => (
                    <th key={attribute.key} className="p-3 text-left"> {attribute.label}</th>
                ))}
                {role === 'admin' && <th className="p-3"> Actions</th> }
            </tr>
        </thead>

        <tbody>
            {items.map((item, index) => {
                const attributeId = attributes.find(a=>a.key === 'id');
                const rowId = attributeId ? attributeId.value(item) : index;

                return(
                    <tr key={rowId} className="border-t border-neutral-200 dark:text-neutral-800">
                        {/* {attributes.map(attribute => {
                            const val = attribute.value(item);
                            const display = Array.isArray(val) ? val.join(', ') : val;
                            return <td key={attribute.key} className="p-3">{display}</td>
                        })} */}
                        
                        {/* check the pfp here!! */}
                        {attributes.map(attribute => {
                            const val = attribute.value(item);
                            if (attribute.key === 'pfp') {
                                return (
                                    <td key={attribute.key} className="p-3">
                                        {val ? (
                                            <img src={val} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-neutral-300" />
                                        )}
                                    </td>
                                );
                            }
                            const display = Array.isArray(val) ? val.join(', ') : val;
                            return <td key={attribute.key} className="p-3">{display}</td>;
                        })}

                        {role === 'admin' && (
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
  )
}

export default InfoTable