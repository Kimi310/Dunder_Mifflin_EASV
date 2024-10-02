import { useSignup, useLogin } from "@hooks/authentication/Authentication";
import { useState } from "react";

export const Login = () => {
    const [signUpEmail, setSignUpEmail] = useState<string>('');
    const [signUpName, setSignUpName] = useState<string>('');

    const [loginEmail, setLoginEmail] = useState<string>('');

    const handleSignUp = () => {
        useSignup({ email: signUpEmail, name: signUpName });
    }

    const handleLogin = () => {
        useLogin({ email: loginEmail });
    }


    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-row gap-10 lg:gap-32 mt-10">
               <div className="flex-1">
                    <h1 className="text-2xl font-bold my-5">Login</h1>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={(e) => setLoginEmail(e.target.value)} />
                        </div>
                        <button className="bg-blue-500 text-white py-2 rounded" onClick={handleLogin}>Login</button>
                    </div>
               </div>

               <div className="flex-1">
                    <h1 className="text-2xl font-bold my-5">Sign Up</h1>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={(e) => setSignUpEmail(e.target.value)}/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Name</label>
                            <input type="tel" onChange={(e) => setSignUpName(e.target.value)}/>
                        </div>
                        <button className="bg-blue-500 text-white py-2 rounded" onClick={handleSignUp}>Sign Up</button>
                    </div>
               </div>
            </div>
        </div>
    )
}