import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/sign-in");
    };

    return (
        <header className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-[#202040]">Dashboard</h2>
            <div className="flex items-center gap-4">
                <span className="text-gray-600">
                    {user?.username || "Guest"}
                </span>

                <button
                    onClick={handleLogout}
                    className="px-4 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;
