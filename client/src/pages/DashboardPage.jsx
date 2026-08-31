import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TextInput from "../components/reusableUiComponents/TextInput";
import SideBar from "../components/generalComponents/SideBar";
import TabButton from '../components/reusableUiComponents/TabButton';
import ThemeToggle from "../components/reusableUiComponents/ThemeToggle";
import { PiSpinnerGapBold } from "react-icons/pi";
import { ImSearch } from "react-icons/im";

function DashboardPage({role}){
    const location = useLocation();
    const [theme, setTheme] = useState(false);

    const [search, setSearch] = useState('');
    const [submitSearch, setSubmitSearch] = useState('');
    const [page, setPage] = useState(1);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    //theme handler
    useEffect(() => {
        const root = document.documentElement;
        if(theme){
            root.classList.add("dark");
        }else{
            root.classList.remove("light");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    //debounce effect: delays submitSearch and resets page from 1 on input change
    useEffect(() => {
        const timer = setTimeout(() => { //initiate a timer 
            setSubmitSearch(search); //change the submit search based on the entered search queue
            setPage(1); //set page to 1 all the time
        }, 500); //or have the timer be 5 seconds (500ms)

        return () => clearTimeout(timer); //clears the timer if user keeps on typing
    }, [search]); //returns the search query 
    
    //data fetching effect thats triggered when submitSearch or page changes
    useEffect(() => {
        const controller = new AbortController(); //creates instance for request cancellation  
        const fetchData = async () => {
            try{
                setLoading(true);
                setError(null);

                //fecth data passing debounced query and page parameter
                const response = await fetch(
                    `/api/dashboard-data?search=${encodeURIComponent(submitSearch)}&page=${page}`,
                    {signal: controller.signal}
                );

                if(!response.ok){
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
            } catch (err){
                //ignore errors triggered by abording request
                if(err.name !== 'AbortError'){
                    console.error(err);
                    setError("Failed to load data");
                }
            } finally{
                if(!controller.signal.aborted){
                    setLoading(false);
                }
            }
        }; 
        fetchData();
        return () => controller.abort();
    },[submitSearch,page]);

    return(
        <div className="flex flex-row">
            <SideBar userRole={role}/>
            <main className="flex-1 p-6 flex flex-row justify-between">
                <div className=" flex flex-col items-center w-full">    
                    {location.pathname.includes('/students') && <h2>Students Table View</h2>}
                    {location.pathname.includes('/courses') && <h2>Courses List View</h2>}
                    {location.pathname.includes('/classrooms') && <h2>Classrooms View</h2>}
                    <div className="flex flex-row gap-4">
                        <TextInput
                            type = "type" //input type
                            placeholder = "search..."
                            value = {search}
                            onChange = {(e) => { setSearch(e.target.value)}}
                            icon = {<ImSearch className="m-2.5 text-neutral-700"/>}
                            className = 'bg-white w-200!' 
                        />
                        <ThemeToggle
                            isDark={theme}
                            onToggle={() => setTheme(!theme)}
                        />
                    </div>

                    {/* render state-dependent Ui inside the main contenct body */}
                    {loading? (
                        <div className="flex items-center justify-center w-full gap-3 p-15">
                            <PiSpinnerGapBold className="animate-spin text-4xl text-primary" />
                            <span className="text-neutral-900 text-xl font-medium"> Loading Information..... please wait </span> {/* change Info to the actual info name */}
                        </div>
                    ): error ? (
                        <div className="flex item justify-center w-full gap-3 p-15">
                            <span className="text-red-600 text-xl font-medium" >{error}</span>
                        </div>
                    ): (
                        <div className="">
                            Table content
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
export default DashboardPage
