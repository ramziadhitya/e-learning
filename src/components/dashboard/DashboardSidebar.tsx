import React, { useState } from "react";
import {
    BarChart2,
    BookOpen,
    CheckCircle,
    User,
    Menu,
    X,
} from "lucide-react";

export default function DashboardSidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="relative">
            {/* Toggle Button */}
            <button
                className="absolute top-4 left-4 z-20 md:hidden bg-white p-2 rounded shadow"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`${isOpen ? "block" : "hidden"
                    } md:block w-48 bg-blue-200 text-gray-800 min-h-screen p-4 transition-all duration-300 z-10`}
            >
                <div className="text-center mb-6">
                    <img
                        src="https://i.pravatar.cc/100"
                        alt="avatar"
                        className="w-16 h-16 rounded-full mx-auto border-2 border-white"
                    />
                    <h5 className="mt-2 font-semibold text-base">Muhammad Ramzi Akhiya</h5>
                    <p className="text-xs text-gray-600">Instructor</p>
                </div>

                <nav className="space-y-2 text-sm">
                    <SidebarItem icon={<BarChart2 size={16} />} label="Dashboard" />
                    <SidebarItem icon={<User size={16} />} label="My Profile" />
                    <SidebarItem icon={<BookOpen size={16} />} label="Enrolled Courses" />
                    <SidebarItem icon={<CheckCircle size={16} />} label="Assignments" />
                    <SidebarItem icon={<BarChart2 size={16} />} label="Analytics" />
                </nav>
            </aside>
        </div>
    );
}

function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-300 transition"
        >
            {icon}
            <span>{label}</span>
        </a>
    );
}
