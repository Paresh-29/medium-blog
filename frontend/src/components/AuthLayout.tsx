import React from "react";
import { Auth } from "./Auth";
import { Quote } from "./Quote";


interface AuthLayoutProps {
    type : "signup" | "signin";
}

const AuthLayout : React.FC<AuthLayoutProps> = ({ type }) => {
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type={type} />
        </div>
        <div className="hidden lg:block">
            <Quote />
        </div>
    </div>
}

export default AuthLayout;