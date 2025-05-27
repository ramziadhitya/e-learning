import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Instructor {
    username: string;
}

interface Course {
    id: number;
    title: string;
    category: string;
    studentsCount: number;
    rating: number;
    instructor?: Instructor;
}

const BreadcrumbCoursesDetails = () => {
    const { slug } = useParams<{ slug: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        axios
            .get(`http://localhost:1337/api/courses?filters[slug][$eq]=${slug}&populate=*`)
            .then((res) => {
                const data = res.data.data?.[0];
                if (data) {
                    setCourse({
                        id: data.id,
                        title: data.title ?? "Untitled Course",
                        category: data.Category ?? "Uncategorized",
                        studentsCount: parseInt(data.studentsCount) || 0,
                        rating: parseFloat(data.rating) || 0,
                        instructor: data.instructor
                            ? { username: data.instructor.username }
                            : undefined,
                    });
                } else {
                    setCourse(null);
                }
            })
            .catch((err) => {
                console.error("Error fetching course:", err);
                setCourse(null);
            })
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading || !course) return <p className="text-center my-4">Loading breadcrumb...</p>;

    const { title, category, rating, studentsCount, instructor } = course;

    return (
        <section className="breadcrumb-wrapper style-2">
            <div className="shape-1">
                <img src="/assets/img/breadcrumb/shape-1.png" alt="img" />
            </div>
            <div className="shape-2">
                <img src="/assets/img/breadcrumb/shape-2.png" alt="img" />
            </div>
            <div className="dot-shape">
                <img src="/assets/img/breadcrumb/dot-shape.png" alt="img" />
            </div>
            <div className="vector-shape">
                <img src="/assets/img/breadcrumb/Vector.png" alt="img" />
            </div>
            <div className="container">
                <div className="page-heading">
                    <ul className="breadcrumb-items">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li className="style-2">Course Details</li>
                    </ul>
                    <div className="breadcrumb-content">
                        <h1>{title}</h1>
                        <div className="courses-breadcrumb-items">
                            <div className="client-image-items">
                                <img src="/assets/img/courses/client-3.png" alt="img" />
                                <div className="client-content">
                                    <span>Instructor</span>
                                    <h5>{instructor?.username || "Unknown"}</h5>
                                </div>
                            </div>
                            <div className="client-image-items">
                                <div className="client-content">
                                    <span>Category</span>
                                    <h5>{category}</h5>
                                </div>
                            </div>
                            <div className="client-image-items">
                                <div className="client-content">
                                    <span>Students</span>
                                    <h5>{studentsCount}</h5>
                                </div>
                            </div>
                            <div className="client-image-items">
                                <div className="client-content">
                                    <span>Rating</span>
                                    <div className="star">
                                        {Array.from({ length: 5 }, (_, i) => {
                                            const filled = i + 1 <= Math.floor(rating);
                                            const half = i + 1 > Math.floor(rating) && i + 0.5 <= rating;
                                            return (
                                                <i
                                                    key={i}
                                                    className={
                                                        filled
                                                            ? "fas fa-star"
                                                            : half
                                                                ? "fas fa-star-half-alt"
                                                                : "far fa-star"
                                                    }
                                                ></i>
                                            );
                                        })}
                                        <b>({rating})</b>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BreadcrumbCoursesDetails;
