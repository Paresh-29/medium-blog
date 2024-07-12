// import { signupType } from "@par3sh/medium-common";
// import axios from "axios";
// import { ChangeEvent, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { BACKEND_URL } from "../config";

// //trpc read
// export const Auth = ({ type }: { type: "signup" | "signin" }) => {
//     const navigate = useNavigate();

//     const [postInputs, setPostInputs] = useState<signupType>({
//         email: "",
//         password: "",
//         name: "",
//     });

//     async function sendRequest() {
//        try {
//          const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, {
//             postInputs
//          })
//          const jwt = response.data;
//          localStorage.setItem("token",jwt);
//          navigate("/blogs")
//        } catch (e) {
        
//        }
//     }

//     return <div className="h-screen flex justify-center flex-col">
//         <div className="flex justify-center">
//             <div>
//             <div className="px-10">
//                 <div className="text-3xl font-extrabold">
//                     Create an account
//                 </div>
//                 <div className="text-slate-400 pt-2 text-center">
//                     { type === "signin" ? "Don't have an account" : "Already have an account?" }
//                     <Link className="pl-2 underline" to={ type === "signin" ? "/signup" :"/signin" }>
//                         {type === "signin" ? "Sign up" : "Sign in" }
//                     </Link>
//                 </div>
//             </div>
//             <div className="pt-4">
//                 {type === "signup" ? <LabelledInput label="Name" placeholder="John Doe" onchange={(e) => {
//                     setPostInputs(c => ({
//                         ...c,
//                         name: e.target.value
//                     }))
//                 }} /> : null }
//                 <LabelledInput label="Username" placeholder="Johndoe@gmail.com" onchange={(e) => {
//                     setPostInputs(c => ({
//                         ...c,
//                         email: e.target.value
//                     }))
//                 }} />
//                 <LabelledInput label="Password" type={"password"}  placeholder="12345678" onchange={(e) => {
//                     setPostInputs(c => ({
//                         ...c,
//                         password: e.target.value
//                     }))
//                 }} />
//                 <button onClick={sendRequest} type="button" className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
//                     { type === "signup" ? "Sign up" : "Sign in" }
//                 </button>
//             </div>
//             </div>
//         </div>
//     </div>
// }

// interface LabelledInputType {
//     label: string;
//     placeholder: string;
//     onchange: (e: ChangeEvent<HTMLInputElement>) => void;
//     type?: string;
// }

// function LabelledInput ({ label, placeholder, onchange, type }: LabelledInputType) {
//     return  <div>
//     <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
//     <input onChange ={onchange} type={ type || "text" } id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
// </div>
// }

import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { signupType, signinType } from "@par3sh/medium-common";
import { Spinner } from "./Spinner";

interface LabelledInputType {
    label: string;
    placeholder: string;
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onchange, type }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
            <input
                onChange={onchange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const initialInputs: signupType | signinType = {
        email: "",
        password: "",
        ...(type === "signup" && { name: "" }),
    };

    const [postInputs, setPostInputs] = useState(initialInputs);

    async function sendRequest() {
        setLoading(true)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            alert("Error while signing up")
        } finally {
            setLoading(false)
        }
    }

        if (loading) {
          return (
            <div className="h-screen flex justify-center items-center">
              <Spinner />
            </div>
          );
        }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            {type === "signup" ? "Create an account" : "Sign in"}
                        </div>
                        <div className="text-slate-400 pt-2 text-center">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-4">
                        {type === "signup" && (
                            <LabelledInput
                                label="Name"
                                placeholder="John Doe"
                                onchange={(e) => setPostInputs({ ...postInputs, name: e.target.value })}
                            />
                        )}
                        <LabelledInput
                            label="Username"
                            placeholder="Johndoe@gmail.com"
                            onchange={(e) => setPostInputs({ ...postInputs, email: e.target.value })}
                        />
                        <LabelledInput
                            label="Password"
                            type="password"
                            placeholder="12345678"
                            onchange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
                        />
                        <button
                            onClick={sendRequest}
                            type="button"
                            className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
