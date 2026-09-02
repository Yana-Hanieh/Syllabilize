import React from 'react'
import InfoCards from './InfoCards'

function InfoCardsContainer({items = [], role, itemType = 'students', attributes = [], onDeleteItem, onEditItem}) {
    if(!items || items.length === 0 ){
            return(
                <div className="w-full bg-white dark:bg-neutral-200 border border-neutral-200 rounded-xl text-neutral-800 text-center p-10">
                    no {itemType} found
                </div>
            )
        }

    return (
        <div className='w-full bg-white dark:bg-neutral-200  border border-neutral-300 rounded-2xl p-4 flex flex-col gap-4 max-w-6/7 mx-auto'>
            {items.map((item, index) => { //loops through data array (items)
                const fields = attributes 
                    .map(attr => ({key: attr.key, label:attr.label, value:attr.value(item)}))
                    .filter(filter => filter.value !== undefined && filter.value !== null && filter.value !== '');
                
                const idField = fields.find(f => f.key === 'id');
              
                return(
                    <InfoCards 
                        key={idField?.value ?? index} //uses the array item id or the info's actual id
                        fields={fields} //spreads the resolved object into individual props
                        pfp={item.pfp}
                        role={role}
                        onDelete={() => onDeleteItem && onDeleteItem(item)}
                        onEdit={() => onEditItem && onEditItem(item)}
                    />
                );
            })}        
        </div>
    )
}

export default InfoCardsContainer
