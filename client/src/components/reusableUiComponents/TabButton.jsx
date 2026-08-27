function TabButton({label, isActive, onClick, variant = 'default',disabled = false ,className = ''}){
    const baseStyles = 'w-full text-left px-4 py-2.5 rounded-xl font-medium transition-colors cursor-pointer'; //this is the basic style of the tab buttons

    const activeStyles = variant === 'danger' ? 'bg-red-500 text-white': 'bg-primary text-white shadow-sm'; //style of the danger tab buttons (cancel, delete, no ect) when hovered over/chosen
    const inactiveStyles = variant === 'danger' ? 'text-red-500 hover:bg-red-50' : 'text-neutral-600 hover:bg-hoverColor'; //basic style of danger tab buttons

    return(
        <button
            type= 'button'
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${isActive? activeStyles: inactiveStyles}`}
        >
            {label}
        </button>
    )
}
export default TabButton