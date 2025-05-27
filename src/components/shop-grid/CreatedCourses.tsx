const createdCourses = [
    { title: "Complete HTML, CSS and Javascript Course", enrolled: 0, status: "Published", img: "/assets/img/shop/01.jpg" },
    { title: "Complete Course on Fullstack Web Developer", enrolled: 2, status: "Published", img: "/assets/img/shop/02.jpg" },
    { title: "Data Science Fundamentals and Advanced Bootcamp", enrolled: 2, status: "Published", img: "/assets/img/shop/03.jpg" },
];

const CreatedCourses = () => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Recently Created Courses</h2>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-t">Courses</div>
            <div className="bg-white rounded-b shadow divide-y">
                {createdCourses.map((course, i) => (
                    <div key={i} className="flex items-center p-4">
                        <img src={course.img} alt={course.title} className="w-16 h-16 rounded mr-4" />
                        <div className="flex-1">
                            <p className="font-medium">{course.title}</p>
                        </div>
                        <div className="w-20 text-center">{course.enrolled}</div>
                        <div className="w-24 text-center">{course.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreatedCourses;
