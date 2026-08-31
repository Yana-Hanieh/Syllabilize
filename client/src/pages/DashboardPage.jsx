import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TextInput from "../components/reusableUiComponents/TextInput";
import SideBar from "../components/generalComponents/SideBar";
import TabButton from '../components/reusableUiComponents/TabButton';
import ThemeToggle from "../components/reusableUiComponents/ThemeToggle";

function DashboardPage({role}){
    const location = useLocation();
    const [theme, setTheme] = useState(false);
    
    useEffect(() => {
        const root = document.documentElement;
        if(theme === false){
            root.classList.add("dark");
        }else{
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return(
        <div className="flex flex-row">
            <SideBar userRole={role}/>
            <main className="flex-1 p-6 flex flex-row justify-between">
            {location.pathname.includes('/students') && <h2>Students Table View</h2>}
            {location.pathname.includes('/courses') && <h2>Courses List View</h2>}
            {location.pathname.includes('/classrooms') && <h2>Classrooms View</h2>}
            <ThemeToggle
                isDark={theme}
                onToggle={() => setTheme(!theme)}
            />
            </main>
        </div>
    );
}
export default DashboardPage
