import Select from 'react-select';
function TextInput({type='text', placeholder, value, onChange, required=false, icon, classroomOptions=[], courseOptions=[], className=''}){
    let inputElement; 

    if(type === 'select'){
        inputElement =  <select 
                            name='classroom' 
                            className={`w-full rounded-full border border-neutral-300 py-2 text-sm outline-none focus:border-primary px-4 
                            ${className}`} value={value} onChange={onChange} required={required}
                        >

                            <option value="">Select a classroom</option>    
                            {classroomOptions.map((option) => (
                                <option 
                                    key={option.classroomId} 
                                    value={option.classroomId}
                                >
                                    {option.classroomName}
                                </option>
                            ))}
                            
                        </select>

    }else if(type === 'multiselect'){
        const courseSelectOptions = courseOptions.map(c => ({ // Map the courseOptions to the format expected by react-select {value, label}
                                        value: c.courseId,
                                        label: c.courseName
                                    }));
        inputElement =  <Select
                            isMulti
                            name="courses"
                            options={courseSelectOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
    }else {
        inputElement =  
            <div className="relative">
                {icon &&( //if there is an icon, then display it
                    <span className='absolute'>
                        {icon} 
                    </span>           
                )}

                <input 
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`w-full rounded-full border border-neutral-300 py-2 text-sm outline-none focus:border-primary
                        ${icon ? 'pl-9 pr-4' : 'px-4'}
                        ${className}`}
                /> 
            </div>
    }
    return inputElement    
}
export default TextInput