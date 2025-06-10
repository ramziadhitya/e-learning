// components/CourseDetails/CoursesDetailsArea.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import qs from "qs";

import CourseTab from "./Tabs/CourseTab";
import CurriculumTab from "./Tabs/CurriculumTab";
import QuizTab from "./Tabs/QuizTab";

const API_URL = import.meta.env.VITE_API_URL;

const CoursesDetailsArea = () => {
    const { slug } = useParams<{ slug: string }>();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Course");

    useEffect(() => {
        if (!slug) return;

        const query = qs.stringify(
            {
                filters: { slug: { $eq: slug } },
                populate: {
                    video: true,
                    thumbnail: true,
                    instructor: true,
                    quizzes: {
                        populate: {
                            questions: {
                                populate: { answers: true },
                            },
                        },
                    },
                },
            },
            { encodeValuesOnly: true }
        );

        axios
            .get(`${API_URL}/api/courses?${query}`)
            .then((res) => {
                const raw = res.data.data?.[0];
                if (raw) setCourse(raw);
            })
            .catch((err) => console.error("Error loading course:", err))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading || !course) {
        return (
            <section className="pt-5 pb-5 bg-light" style={{ minHeight: "600px" }}>
                <div className="container text-center py-5">
                    <p>{loading ? "Loading..." : "Course not found"}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-5 pb-5 bg-light" style={{ minHeight: "600px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mb-4">
                        <div className="bg-white rounded p-4 shadow-sm">
                            <ul className="nav nav-pills mb-4 gap-2">
                                {["Course", "Curriculum", "Quiz"].map((tab) => (
                                    <li className="nav-item" key={tab}>
                                        <button
                                            className={`nav-link ${activeTab === tab ? "active" : ""}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="tab-content" style={{ minHeight: "500px" }}>
                                {activeTab === "Course" && <CourseTab description={course.description} />}
                                {activeTab === "Curriculum" && <CurriculumTab videos={course.video} />}
                                {activeTab === "Quiz" && (
                                    <QuizTab
                                        quiz={course.quizzes?.[0]}
                                        onSubmit={(result) => {
                                            console.log("Quiz result:", result);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoursesDetailsArea;
