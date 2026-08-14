import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute(){
    const {loggedInUser} = useAuth();
    if(!loggedInUser){
        return <Navigate to="/login" replace />;
    }
    return <Outlet/>;
}
export default ProtectedRoute;