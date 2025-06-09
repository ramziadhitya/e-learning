import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NiceSelect from "../../ui/NiceSelect";
import axios from "axios";

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    thumbnail?: {
        url: string;
    };
    category: string;
    studentsCount: number;
    rating: number;
    instructor?: {
        username: string;
    };
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:1337";
const CoursesArea = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    const selectHandler = (_e: any) => { };

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/courses?populate=*`)
            .then((res) => {
                console.log("Strapi courses response:", res.data);
                const formattedCourses = res.data.data.map((item: any) => {
                    const {
                        id,
                        title,
                        slug,
                        description,
                        category,
                        studentsCount,
                        rating,
                        documentId,
                        thumbnail,
                        instructor
                    } = item;

                    return {
                        id,
                        title,
                        slug,
                        description,
                        category,
                        studentsCount,
                        rating,
                        documentId,
                        thumbnail: thumbnail ? {
                            url: thumbnail.url
                        } : undefined,

                        instructor: instructor ? {
                            username: instructor.username
                        } : undefined,
                    };
                });

                setCourses(formattedCourses);
            })
            .catch((err) => console.error("Error fetching courses:", err))
            .finally(() => setLoading(false));
    }, []);


    return (
        <section className="popular-courses-section fix section-padding">
            <div className="container">
                <div className="coureses-notices-wrapper">
                    <div className="courses-showing">
                        <div className="icon-items">
                            <Link to="/courses-grid"><i className="fas fa-th"></i></Link>
                            <Link to="/courses-list"><i className="fas fa-bars"></i></Link>
                        </div>
                        <h5>Showing <span>{courses.length}</span> Results</h5>
                    </div>
                    <div className="form-clt">
                        <NiceSelect
                            className="category"
                            options={[
                                { value: "01", text: "Sort by : Default" },
                                { value: "02", text: "Sort by popularity" },
                                { value: "03", text: "Sort by average rating" },
                                { value: "04", text: "Sort by latest" },
                            ]}
                            defaultCurrent={0}
                            onChange={selectHandler}
                            name=""
                            placeholder="" />
                    </div>
                </div>

                <div className="row">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        courses.map((course) => {
                            const {
                                id,
                                title,
                                slug,
                                thumbnail,
                                category,
                                studentsCount,
                                rating,
                                instructor
                            } = course;

                            return (
                                <div className="col-xl-4 col-lg-6 col-md-6" key={id}>
                                    <div className="courses-card-main-items">
                                        <div className="courses-card-items style-2">
                                            <div className="courses-image">
                                                <img
                                                    src={thumbnail?.url ? `${API_BASE_URL}${thumbnail.url}` : "/assets/img/default-thumbnail.jpg"}
                                                    alt={title}
                                                />

                                                <h4 className="topic-title">{title}</h4>
                                            </div>
                                            <div className="courses-content">
                                                <ul className="post-cat">
                                                    <li><Link to="/courses">{category}</Link></li>
                                                    <li>
                                                        {[...Array(5)].map((_, i) => {
                                                            if (rating >= i + 1) {
                                                                return <i key={i} className="fas fa-star"></i>;
                                                            } else if (rating > i && rating < i + 1) {
                                                                return <i key={i} className="fas fa-star-half-alt"></i>;
                                                            } else {
                                                                return <i key={i} className="far fa-star"></i>;
                                                            }
                                                        })}
                                                    </li>
                                                </ul>
                                                <h3>
                                                    <Link to={`/courses-details/${slug}`}>{title}</Link>
                                                </h3>
                                                <div className="client-items">
                                                    <div className="client-img bg-cover" style={{
                                                        backgroundImage: `url(/assets/img/courses/client-1.png)`
                                                    }}></div>
                                                    <p>{instructor?.username || "Unknown Instructor"}</p>

                                                </div>
                                                <ul className="post-class">
                                                    <li><i className="far fa-books"></i> Lessons</li>
                                                    <li><i className="far fa-user"></i> {studentsCount} Students</li>
                                                    <li><Link to={`/courses-details/${slug}`} className="theme-btn">Enroll Now</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
};

export default CoursesArea;
