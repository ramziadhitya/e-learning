import React, { useState } from "react";
import {
    BarChart2,
    BookOpen,
    User,
    Menu,
    X,
    ChevronDown,
    ChevronUp,
    FileQuestion,
    ListChecks,
    ClipboardList,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function DashboardSidebar({ onNavigate }: { onNavigate: (view: string) => void }) {
    const [isOpen, setIsOpen] = useState(true);
    const [quizDropdownOpen, setQuizDropdownOpen] = useState(false);
    const { user } = useAuth(); // Ambil user dari AuthContext

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
                    } md:block w-60 bg-blue-200 text-gray-800 min-h-screen p-4 transition-all duration-300 z-10`}
            >
                <div className="text-center mb-6">
                    <h5 className="mt-2 font-semibold text-base">{user?.username || "Guest"}</h5>
                    <p className="text-xs text-gray-600">Instructor</p>
                </div>

                <nav className="space-y-2 text-sm">
                    <SidebarItem icon={<BarChart2 size={16} />} label="Dashboard" onClick={() => onNavigate("dashboard")} />
                    <SidebarItem icon={<User size={16} />} label="My Profile" onClick={() => onNavigate("courses")} />
                    <SidebarItem icon={<BookOpen size={16} />} label="Add New Course" onClick={() => onNavigate("addCourse")} />

                    {/* Quiz Forms Dropdown */}
                    <div>
                        <button
                            onClick={() => setQuizDropdownOpen(!quizDropdownOpen)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-300 transition"
                        >
                            <div className="flex items-center gap-3">
                                <BookOpen size={16} />
                                <span>Add Quiz Forms</span>
                            </div>
                            {quizDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {quizDropdownOpen && (
                            <div className="ml-6 mt-1 space-y-1">
                                <SidebarItem
                                    icon={<FileQuestion size={16} />}
                                    label="Quiz"
                                    onClick={() => onNavigate("quizForm")}
                                />
                                <SidebarItem
                                    icon={<ListChecks size={16} />}
                                    label="Question"
                                    onClick={() => onNavigate("questionForm")}
                                />
                                <SidebarItem
                                    icon={<ClipboardList size={16} />}
                                    label="Answer"
                                    onClick={() => onNavigate("answerForm")}
                                />
                            </div>
                        )}
                    </div>

                    <SidebarItem icon={<BarChart2 size={16} />} label="Analytics" />
                </nav>
            </aside>
        </div>
    );
}

function SidebarItem({
    icon,
    label,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-300 transition"
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}
