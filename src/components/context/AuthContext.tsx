import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
    id: number;
    username: string;
    email: string;

}

interface AuthContextProps {
    user: User | null;
    token: string | null;
    login: (identifier: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (
        identifier: string,
        password: string
    ): Promise<{ success: boolean; message?: string }> => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/local`, {
                identifier,
                password,
            });

            const { jwt, user } = res.data;
            setUser(user);
            setToken(jwt);
            localStorage.setItem("token", jwt);
            localStorage.setItem("user", JSON.stringify(user));

            window.location.href = "/dashboard";

            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error?.response?.data?.error?.message || "Login gagal.",
            };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
