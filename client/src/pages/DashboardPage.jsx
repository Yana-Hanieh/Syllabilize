import { useState } from "react";
import TextInput from "../components/generalComponents/TextInput";
import SideBar from "../components/generalComponents/SideBar";
import TabButton from '../components/reusableUiComponents/TabButton';

function DashboardPage({role}){
    return(
        <div className="flex flex-row">
            <SideBar/>
            <div className="flex items-center justify-center">
                welcome to {role} dashboard
           
            </div>
        </div>
    );
}
export default DashboardPage
