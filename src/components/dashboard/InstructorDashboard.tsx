import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

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
    return (
        <div className="flex min-h-screen bg-gray-100">
            <DashboardSidebar />
            <main className="flex-1 p-6">
                <DashboardHeader />

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
                    <h2 className="font-semibold text-lg mb-4">Recently Created Courses</h2>
                    <table className="w-full table-auto text-left">
                        <thead>
                            <tr className="text-gray-600 text-sm border-b">
                                <th className="py-2">Courses</th>
                                <th className="py-2">Enrolled</th>
                                <th className="py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentCourses.map((course, i) => (
                                <tr key={i} className="border-b hover:bg-gray-50">
                                    <td className="py-3 flex items-center gap-3">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-10 h-10 rounded object-cover"
                                        />
                                        <span>{course.title}</span>
                                    </td>
                                    <td className="py-3">{course.enrolled}</td>
                                    <td className="py-3">
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                            {course.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
