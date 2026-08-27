export default function TextInput({type='text', placeholder, value, onChange, required=false, icon}){
    return (
        <div className="relative w-full">
            {icon &&( //if there is an icon, then display it
                <span className=''>
                    {icon} 
                </span>           
            )}

            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onchange}
                required={required}
                className={`w-full rounded-full border border-neutral-300 py-2 text-sm outline-none focus:border-primary
                    ${icon ? 'pl-9 pr-4' : 'px-4'}`}
            /> 
        </div>
         
    )
    
}