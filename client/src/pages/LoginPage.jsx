import { useState } from "react";
import TextInput from "../components/generalComponents/TextInput";

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
        <div className="flex items-center justify-center">
            <div className="sm:w-full max-w-sm bg-white shadow-sm rounded-xl border border-neutral-100 p-8">
                <h1 className="text-center pb-4 text-2xl text-neutral-600 font-semibold">WELCOME BACK</h1>
                
                {/* Role toggle */}
                <div className="relative flex mb-3 p-1 rounded-full bg-neutral-100">
                    <button 
                        type ="button"
                        onClick={() => setRole('student')}
                        className={`flex-1 py-2 rounded-full text-md font-medium transition-colors cursor-pointer ${role === 'student'?'bg-primary text-white':'text-neutral-600'}`}>
                        Student
                    </button>
                    <button 
                        type= "button"
                        onClick={() => setRole('admin')}
                        className={`flex-1 py-2 rounded-full text-md font-medium  transition-colors cursor-pointer ${role === 'admin'? 'bg-primary text-white':'text-neutral-600'}`}>
                        Admin
                    </button>
                </div>

                {/* Data entry */}
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4">
                        <TextInput
                            type="email"
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                       
                        <TextInput 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(p) => setPassword(p.target.value)}
                            required
                        />

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <button
                            type='submit'
                            className="py-2 rounded-full bg-neutral-100 hover:bg-secondary text-neutral-600 cursor-pointer">
                            Login
                        </button>

                </form>
               
            </div>
        </div>
    )
}
export default LoginPage
