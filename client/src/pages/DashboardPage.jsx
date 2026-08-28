import { useState } from "react";
import { useLocation } from "react-router-dom";
import TextInput from "../components/reusableUiComponents/TextInput";
import SideBar from "../components/generalComponents/SideBar";
import TabButton from '../components/reusableUiComponents/TabButton';

function DashboardPage({role}){
    const location = useLocation();
    return(
        <div className="flex flex-row">
            <SideBar userRole={role}/>
            <main className="flex-1 p-6">
        {location.pathname.includes('/students') && <h2>Students Table View</h2>}
        {location.pathname.includes('/courses') && <h2>Courses List View</h2>}
        {location.pathname.includes('/classrooms') && <h2>Classrooms View</h2>}
      </main>
        </div>
    );
}
export default DashboardPage
