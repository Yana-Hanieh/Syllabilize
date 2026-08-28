function TabButton({label, icon:Icon, isActive, onClick, variant = 'default',disabled = false ,className = ''}){
    const baseStyles = 'flex items-center gap-2 text-left px-4 py-2.5 rounded-full font-medium transition-colors cursor-pointer'; //this is the basic style of the tab buttons

    const activeStyles = variant === 'danger' ? 'bg-red-500': 'bg-primary text-white'; //style of the danger tab buttons (cancel, delete, no ect) when hovered over/chosen
    const inactiveStyles = variant === 'danger' ? 'text-red-500 hover:bg-red-50' : 'text-neutral-600 hover:text-black'; //basic style of danger tab buttons

    return(
        <button
            type= 'button'
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles} ${className}`}
 >
            {Icon && <Icon className='text-xl shrink-0'/>} 
            {label}
        </button>
    )
}
export default TabButton