import { useState } from "react";

function LoginPage(){
    const [role, setRole] = useState('student');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[error,setError] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');

        const res = await fetch('http://localhost:300/api/auth/login',{
            method: 'POST', 
            header: {'Content-Type': 'application/json'},
            credentials: 'include', //required for the httpOnly cookie to be set
            body: JSON.stringify({email,password}), //saves the email and password in the body variable
        });

        if(!res.ok){ //if the response 
            setError('Invalid email or password');
            return;
        }

        const meRes= await fetch ('http://localhost:300/api/auth/me',{ //fetches data from the me breakpoint
            credentials: 'include',
        });
        const me = await meRes.json(); //saves the fetched data from me endpoint as a me variable

        if(me.userRole !== role){ //compares if the seleced role is the same as the data fetched from the me breakpoint
            setError(`This account is registered as ${me.userRole}, not ${role}. Please try again.`);
            return;
        }
        window.location.href = me.userRole === 'admin'? '/admin/dashboard': '/student/dashboard'; //changes the url based on the role
    };

    return(
        <div className="flex flex-col gap-10 p-30 items-center bg-primary min-h-screen">
            <div className="flex flex-row gap-10 ring-4 ring-red-500">
                <button className="border rounded-xl px-4 py-2 text-xl">Student</button>
                <button className="border rounded-xl px-4 py-2 text-xl">Admin</button>
            </div>
        </div>
    )
}
export default LoginPage
