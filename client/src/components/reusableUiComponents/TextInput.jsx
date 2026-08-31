function TextInput({type='text', placeholder, value, onChange, required=false, icon, className=''}){
    return (
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
         
    )
    
}
export default TextInput