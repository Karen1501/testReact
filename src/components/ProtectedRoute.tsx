import { Navigate } from "react-router-dom";
import { useSelector} from "react-redux";
import { RootState } from "../store/store";

interface ProtectedRouteProps {
    children : React.ReactElement
}

export default function ProtectedRoute({children}:ProtectedRouteProps) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)    
    return isAuthenticated ? children : <Navigate to='/login'/>
}