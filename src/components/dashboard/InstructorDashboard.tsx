// Import Tailwind hanya untuk dashboard
import "../../dashboard.css";

import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { useState } from "react";
import AddCourseForm from "./AddCourseForm";
import AddQuizForm from "../quiz/AddQuizForm";
import AddQuestionForm from "../quiz/AddQuestionForm";
import AddAnswerForm from "../quiz/AddAnswerForm";

const stats = [
    { label: "Enrolled Course", value: 4 },
    { label: "Active Course", value: 2 },
    { label: "Completed Course", value: 13 },
    { label: "Total Students", value: 10 },
    { label: "Total Course", value: 11 },
];

const recentCourses = [
    {
        title: "Complete HTML, CSS and Javascript Course",
        status: "Published",
        enrolled: 0,
        image: "/images/course1.jpg",
    },
    {
        title: "Complete Course on Fullstack Web Developer",
        status: "Published",
        enrolled: 2,
        image: "/images/course2.jpg",
    },
    {
        title: "Data Science Fundamentals and Advanced Bootcamp",
        status: "Published",
        enrolled: 2,
        image: "/images/course3.jpg",
    },
];

export default function InstructorDashboard() {
    const [activeView, setActiveView] = useState("dashboard");

    const renderView = () => {
        switch (activeView) {
            case "dashboard":
                return (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="bg-white p-4 rounded-lg shadow text-center"
                                >
                                    <div className="text-2xl font-bold text-blue-600">
                                        {stat.value.toString().padStart(2, "0")}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Recently Created Courses */}
                        <section className="bg-white rounded-lg shadow p-4 mb-8">
                            <h2 className="font-semibold text-lg mb-4">
                                Recently Created Courses
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {recentCourses.map((course, index) => (
                                    <div
                                        key={index}
                                        className="border rounded-lg overflow-hidden bg-gray-50 shadow-sm"
                                    >
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-40 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-semibold text-md mb-2">
                                                {course.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-1">
                                                Status: {course.status}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Enrolled Students: {course.enrolled}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                );

            case "addCourse":
                return <AddCourseForm onBack={() => setActiveView("dashboard")} />;

            case "quizForm":
                return <AddQuizForm />;

            case "questionForm":
                return <AddQuestionForm />;

            case "answerForm":
                return <AddAnswerForm />;

            default:
                return <p className="text-gray-600">Page not found.</p>;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <DashboardSidebar onNavigate={setActiveView} />
            <main className="flex-1 p-6 overflow-y-auto">
                <DashboardHeader />
                {renderView()}
            </main>
        </div>
    );
}
