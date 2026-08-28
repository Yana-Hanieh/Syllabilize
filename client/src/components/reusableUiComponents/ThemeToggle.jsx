import { MdDarkMode, MdLightMode } from "react-icons/md";

function ThemeToggle({isDark, onToggle}){
    return(
        <button
            onClick={onToggle}
            className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer bg-white shadow-sm">
            {isDark ? <MdLightMode /> : <MdDarkMode /> } 
        </button>
    )
}
export default ThemeToggle