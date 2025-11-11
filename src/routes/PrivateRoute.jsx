// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im"; // npm install react-icons

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // 1. Loading State (Prevent redirect on refresh)
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
                <ImSpinner9 className="text-6xl text-blue-500 animate-spin" />
            </div>
        );
    }

    // 2. User Check
    if (user) {
        return children;
    }

    // 3. Redirect to Login
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;