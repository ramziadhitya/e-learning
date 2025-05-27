// src/components/DashboardHeader.tsx
import React from "react";

const DashboardHeader = () => {
    return (
        <header className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center">
            <h1 className="text-xl font-bold text-[#202040]">Dashboard</h1>
            <div className="flex items-center gap-4">
                <span className="text-gray-600">John David</span>
                <img
                    src="https://i.pravatar.cc/40"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                />
            </div>
        </header>
    );
};

export default DashboardHeader;
