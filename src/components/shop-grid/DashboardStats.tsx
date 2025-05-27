const stats = [
    { label: "Enrolled Course", value: 4 },
    { label: "Active Course", value: 2 },
    { label: "Completed Course", value: 13 },
    { label: "Total Students", value: 10 },
    { label: "Total Course", value: 11 },
];

const DashboardStats = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-4 rounded shadow text-center">
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold">{String(stat.value).padStart(2, '0')}</p>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
