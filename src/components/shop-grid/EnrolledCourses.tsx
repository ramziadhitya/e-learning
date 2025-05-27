const enrolledCourses = [
    { title: "Wordpress for Beginners - Master Wordpress Quickly", instructor: "Ramzi", img: "/assets/img/shop/01.jpg" },
    { title: "Wordpress for Beginners - Master Wordpress Quickly", instructor: "Ramzi", img: "/assets/img/shop/02.jpg" },
    { title: "Wordpress for Beginners - Master Wordpress Quickly", instructor: "Ramzi", img: "/assets/img/shop/03.jpg" },
];

const EnrolledCourses = () => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Recently Enrolled Courses</h2>
            <div className="grid md:grid-cols-3 gap-4">
                {enrolledCourses.map((course, i) => (
                    <div key={i} className="bg-white shadow rounded p-4">
                        <img src={course.img} alt={course.title} className="w-full h-40 object-cover rounded" />
                        <p className="mt-2 font-semibold">{course.title}</p>
                        <p className="text-sm text-gray-500">{course.instructor} - Instructor</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnrolledCourses;
