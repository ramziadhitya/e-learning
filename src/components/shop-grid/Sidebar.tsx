const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-md p-4 flex flex-col items-center">
            <img src="/assets/img/user.jpg" alt="Profile" className="w-20 h-20 rounded-full" />
            <h2 className="mt-4 font-bold text-center">Muhammad Ramzi Akhiya</h2>
            <p className="text-sm text-gray-500">Instructor</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Add New Course</button>

            <nav className="mt-8 w-full space-y-2">
                {["Dashboard", "My Profile", "Enrolled Course", "Assignment", "Notifications", "Settings", "Logout"].map((item) => (
                    <div key={item} className="px-4 py-2 hover:bg-blue-100 rounded cursor-pointer text-gray-700">
                        {item}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
