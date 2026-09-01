import React from 'react'
import InfoCards from './InfoCards'

function InfoCardsContainer({items = [], role, itemType = 'students', onDeleteItem, onEditItem}) {
    if(!items || items.length === 0 ){
            return(
                <div className="w-full bg-white dark:bg-neutral-200 border border-neutral-200 rounded-xl text-neutral-800 text-center p-10">
                    no {itemType} found
                </div>
            )
        }

    return (
        <div className='w-full bg-white dark:bg-neutral-200  border border-neutral-300 rounded-2xl p-4 flex flex-col gap-4 max-w-6/7 mx-auto'>
            {items.map((item) => {
                let name = '';
                let id = '';
                let email = null;
                let courses = null;
                let classroom= null;
                let pfp = null;

                if (itemType === 'students'){
                    name = item.userName || item.name;
                    id = item.studentId || item.id;
                    email = item.userEmail || item.email;
                    courses = item.courses || item.courseId;
                    classroom = item.classroom || item.classroomId;
                    pfp = item.pfp;
                }
                else if (itemType === 'courses'){
                    name = item.name || item.courseName;
                    id = item.courseId || item.id;
                }
                else if (itemType === 'classrooms'){
                    name = item.name || item.roomName;
                    id = item.classroomId || item.id;
                }

                return(
                    <InfoCards 
                        key={item.id || id}
                        pfp={pfp}
                        name={name}
                        id={id}
                        email={email}
                        courses={courses}
                        classroom={classroom}
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
