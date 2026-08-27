export default function TabButton({label, isActive, onClick, variant = 'default'}){
    const baseStyles = 'w-full text-left px-4 py-2.5 rounded-xl font-medium transition-colors cursor-pointer';

    const activeStyles = variant === 'danger' ? 'bg-red-500 text-white': 'bg-primary text-white shadow-sm';
    const inactiveStyles = variant === 'danger' ? 'text-red-500 hover:bg-red-50' : 'text-neutral-600 hover:bg-hoverColor';

    return(
        <button
            type= 'button'
            onClick={onClick}
            className={`${baseStyles} ${isActive? activeStyles: inactiveStyles}`}
        >
            {label}

        </button>
    )
}