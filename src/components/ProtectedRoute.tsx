// src/common/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";


interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const { token, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // bisa diganti dengan spinner
    }

    if (!token) {
        return <Navigate to="/sign-in" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
