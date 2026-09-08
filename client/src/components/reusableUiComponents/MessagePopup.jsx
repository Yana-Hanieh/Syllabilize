import React from 'react'
import TextInput from './TextInput'
import TabButton from './TabButton';
import { TiCancel } from "react-icons/ti";

function MessagePopup({attributes, initialValues=[], classType, coursesOptions, classroomOptions, onClose, onSubmit, className=''}) {
     const displayName = typeof initialValues === 'object' && initialValues !== null 
        ? initialValues.userName || initialValues.courseName || initialValues.classroomName || 'this item'
        : initialValues || 'this item';

    const [formValues, setFormValues] = React.useState(initialValues || {});

    // update the state whenever the initialValues prop changes
    const handleInputChange = (attribute, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [attribute]: value,
        }));
    }

    const handleSubmit = (e) => { 
        e.preventDefault(); //prevents the page from auto refreshing when the submit button is clicked
        onSubmit({ ...(initialValues || {}), ...formValues });
    }

    //handles the change in format values when the user inputs data into the form fields
    const handleFieldChange = (key, attribute) => {
        const value = attribute?.target ? attribute.target.value : attribute
        handleInputChange(key, value);
    }
    
    return (   
    <form className="bg-neutral-100 rounded-xl dark:bg-white justify-items-center p-4 "> 
        {/* cancel button */}
        <TabButton 
                type='button'
                icon={<TiCancel className="text-red-500 text-2xl"/>}
                onClick={onClose}
                variant="danger"
                className='w-fit! p-1! ml-auto'
            />

        <h1 className='pt-2 '>
            {initialValues? `Editing ${displayName}` : `Adding a new ${classType}`}
        </h1>   

        {/* form fields */}
        <div className={`p-4 grid gap-2 ${attributes.length ===1 ? 'grid-cols-1': 'grid-cols-2'} `}>
            {attributes.map((a) => {
                const display =
                        <TextInput 
                            type={a.type }
                            placeholder={`${a.label}`}
                            value={formValues[a.key] ?? ''}
                            onChange={(e) => handleFieldChange(a.key, e)}
                            required={a.required}
                            courseOptions={coursesOptions}
                            classroomOptions={classroomOptions}
                            key={a.key}
                            className='bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 rounded-md'
                        />
                return (display)
            })}
        </div>
        
        {/* submit button */}
        <TabButton 
            type="submit"
            onClick={handleSubmit}
            variant="default"
            label="save"
            className='w-1/2! py-1.5! justify-center text-center! bg-primary text-white hover:bg-secondary hover:text-black'
        />
    </form>
  )
}

export default MessagePopup