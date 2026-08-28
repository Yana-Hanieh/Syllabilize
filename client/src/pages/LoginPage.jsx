import { useState } from "react";
import TextInput from "../components/reusableUiComponents/TextInput";
import TabButton from "../components/reusableUiComponents/TabButton";
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const [role, setRole] = useState('student');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[error,setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');
        try{
            //user Login
            const res = await fetch('http://localhost:3000/api/auth/login',{
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                credentials: 'include', //required for the httpOnly cookie to be set
                body: JSON.stringify({email,password}), //saves the email and password in the body variable
            });

            //login failed
            if(!res.ok){
                setError('Invalid email or password');
                return;
            }

            //get the user's info from their current login
            const meRes = await fetch ('http://localhost:3000/api/auth/me',{ //fetches data from the me breakpoint
                credentials: 'include',
            });
            
            if(!meRes.ok){
                setError('Could not retrieve your account Information');
                return;
            }
            
            const me = await meRes.json(); //saves the fetched data from me endpoint as a me variable
           
            if(me.userRole !== role){ //compares if the seleced role is the same as the data fetched from the me breakpoint
                setError(`This account is registered as ${me.userRole}, not ${role}. Please try again.`);
                return;
            }

            //Redirects to the main page based on the user's actual role
            if(me.userRole === 'admin'){
                navigate(`/admin/students`);
            } else if(me.userRole === 'student'){
                navigate(`/student/courses`);
            }
        } catch(error){
            console.error(error);
            setError(`Something went wrong. Please try again...`);
        }
        // const targetPath = me.userRole ==='admin' ? '/admin/students' : '/student/courses'
        // navigate(targetPath);            
    };

    return(
        <div className="flex min-h-screen items-center justify-center">
            <div className="sm:w-full max-w-sm bg-white shadow-sm rounded-xl border border-neutral-100 p-8">
                <h1 className="text-center pb-4 text-2xl text-neutral-600 font-semibold">WELCOME BACK</h1>
                
                {/* Role toggle */}
                <div className="relative flex mb-3 rounded-full bg-neutral-100">

                    <TabButton
                        label='Student'
                        onClick={() => setRole('student')}
                        isActive={role === 'student'}
                        className={`flex-1 py-2 rounded-full text-md font-medium justify-center`}
                    />

                     <TabButton
                        label='Admin'
                        onClick={() => setRole('admin')}
                        isActive={role === 'admin'}
                        className={`flex-1 py-2 rounded-full text-md font-medium justify-center`}
                    />
                    
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
