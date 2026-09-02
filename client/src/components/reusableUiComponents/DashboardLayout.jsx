import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import TextInput from "./TextInput";
import SideBar from "../generalComponents/SideBar";
import ThemeToggle from "./ThemeToggle";
import { ImSearch } from "react-icons/im";

function DashboardLayout({role}){
    const location = useLocation();

    //lazy initializer (when you initialize a function inside a state)
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme"); //retrieves the initial value of the theme from the localStorage (true or false)
        return savedTheme === "true"; //if returns a boolean value instead of a string value: true if savedTheme="true" and false if savedTheme="false"
    });

    const [search, setSearch] = useState('');
    const [submitSearch, setSubmitSearch] = useState('');
    const [page, setPage] = useState(1);

    //theme handler
    useEffect(() => {
        const root = document.documentElement; //get the html elemnt of the webpage (to change the theme accross the whole system)
        root.classList.toggle("dark", theme); //takes the classList element of the root (html) which has a class called dark. If the condition(theme) is true, add dark else remove dark 
        localStorage.setItem("theme", theme); //save the current value of theme under the key "theme" as strings into the local storage
    }, [theme]); //run the effect whenever the theme changes

    //debounce effect: delays submitSearch and resets page from 1 on input change
    useEffect(() => {
        const timer = setTimeout(() => { //initiate a timer 
            setSubmitSearch(search); //change the submit search based on the entered search queue
            setPage(1); //set page to 1 all the time
        }, 500); //or have the timer be 5 seconds (500ms)

        return () => clearTimeout(timer); //clears the timer if user keeps on typing
    }, [search]); //returns the search query 
    
    //Helper function to extract title dynamically
    const getPageTitle = () => {
        if (location.pathname.includes('/students')) return 'Students';
        if (location.pathname.includes('/courses')) return 'Courses';
        if (location.pathname.includes('/classrooms')) return 'Classsrooms';
        return '';
    };

    return(
        <div className="flex flex-row">

            <SideBar userRole={role}/>
                
                <div className="flex-1 flex flex-col min-w-0 p-4 md:p-6 gap-6">
                    {/* relative flex items-center justify-center w-full px-4 min-h-[44px] */}
                 
                    <div className="relative flex items-center justify-center"> {/* try justfy center instead of between */}
                        <div className="w-full max-w-2xl lg:max-w-3-xl">
                            <TextInput
                                type = "text" //input type
                                placeholder = {`Search ${getPageTitle().toLocaleLowerCase()}...`}
                                value = {search}
                                onChange = {(e) => { setSearch(e.target.value)}}
                                icon = {<ImSearch className="m-2.5 text-neutral-700"/>}
                                className = 'bg-white' 
                            />
                        </div>

                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <ThemeToggle
                                isDark={theme}
                                onToggle={() => setTheme(!theme)}
                            />
                        </div>
                        
                    </div>
                    <h1 className="text-2xl font-bold text-neutral-800 px-4">{getPageTitle()}</h1>
                    
                    {/* Using outlet to render child routers and pass state to them */}
                    <Outlet context={{submitSearch,page,setPage}}/>

                </div>


        </div>
    );
}
export default DashboardLayout
