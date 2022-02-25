import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Signin from "./Auth/Signin";



function ProtectedRoute({ admin }) {
    const { loggedIn, user } = useAuth();

    if (admin && user?.role !== 'admin') {
        return <Navigate to='/' />
    }
    
    if (loggedIn) {
        return <Outlet />;
    }
    else {
        return <Signin />;
    }
}


export default ProtectedRoute