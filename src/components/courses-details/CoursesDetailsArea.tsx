// CoursesDetailsArea.tsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";

const API_URL = import.meta.env.VITE_API_URL;

const CoursesDetailsArea = () => {
    const { slug } = useParams<{ slug: string }>();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({});
    const [quizResult, setQuizResult] = useState<any>(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);


    const handleSubmitQuiz = async () => {
        const quiz = course?.quizzes?.[0];
        if (!quiz) return;

        const questions = quiz.questions || [];
        let correct = 0;

        questions.forEach((q: any) => {
            const selectedId = selectedAnswers[q.id];
            const answer = q.answers.find((a: any) => a.id === selectedId);
            if (answer?.isCorrect) correct++;
        });

        const total = questions.length;
        const score = Math.round((correct / total) * 100);
        const passed = score >= 70;

        try {
            await axios.post(`${API_URL}/api/quiz-submissions`, {
                data: {
                    userName: "Guest",
                    score,
                    passed,
                    quiz: quiz.id,
                    totalQuestions: total,
                    correctAnswers: correct,
                },
            });

            setQuizResult({ score, correctAnswers: correct, totalQuestions: total, passed });
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("Gagal menyimpan hasil quiz.");
        }
    };

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

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (quizStarted && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        }

        if (quizStarted && timeLeft === 0) {
            handleSubmitQuiz();
        }

        return () => clearTimeout(timer);
    }, [quizStarted, timeLeft]);

    if (loading) {
        return (
            <div className="p-4">
                <div className="placeholder-glow">
                    <div className="placeholder col-12 mb-3" style={{ height: "20px" }}></div>
                    <div className="placeholder col-8 mb-3" style={{ height: "20px" }}></div>
                    <div className="placeholder col-10" style={{ height: "20px" }}></div>
                </div>
            </div>
        );
    }
    if (!course) return <p className="text-center py-5">Course not found</p>;


    return (
        <section
            className="bg-light"
            style={{
                minHeight: "100vh",
                paddingTop: "60px",
                paddingBottom: "60px",
                overflowX: "hidden",
            }}
        >
            <div
                className="container"
                style={{
                    maxWidth: "1140px",
                    margin: "0 auto",
                    transition: "opacity 0.2s ease-in-out",
                }}
            >
                <div className="row g-4">
                    {/* LEFT: MAIN CONTENT */}
                    <div className="col-lg-8">
                        <div
                            className="bg-white rounded shadow-sm"
                            style={{
                                padding: "24px",
                                minHeight: "700px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            {/* Tabs */}
                            <ul
                                className="nav nav-pills mb-4 gap-2"
                                id="tabs"
                                style={{ height: "42px" }}
                            >
                                {["Course", "Curriculum", "Quiz"].map((tab) => (
                                    <li className="nav-item" key={tab}>
                                        <a
                                            href={`#${tab}`}
                                            data-bs-toggle="tab"
                                            className={`nav-link ${tab === "Course" ? "active" : ""}`}
                                            role="tab"
                                            style={{
                                                width: "120px",
                                                textAlign: "center",
                                                height: "100%",
                                            }}
                                        >
                                            {tab}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* Content with fixed height to avoid layout shift */}
                            <div
                                className="tab-content"
                                style={{
                                    minHeight: "500px",
                                    position: "relative",
                                }}
                            >
                                {/* -- original tab contents -- */}
                                {/* NO CHANGES TO LOGIC */}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: SIDEBAR */}
                    <div className="col-lg-4">
                        <div
                            className="bg-white rounded shadow-sm"
                            style={{
                                padding: "24px",
                                minHeight: "700px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    aspectRatio: "16 / 9",
                                    backgroundColor: "#eee",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    marginBottom: "16px",
                                }}
                            >
                                <img
                                    src={
                                        course.thumbnail?.url
                                            ? `${API_URL}${course.thumbnail.url}`
                                            : "/assets/img/default-thumbnail.jpg"
                                    }
                                    alt={course.title}
                                    loading="lazy"
                                    width="100%"
                                    height="100%"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>

                            <div style={{ flexGrow: 1 }}>
                                <h5 className="text-muted" style={{ fontSize: "14px", marginBottom: "6px" }}>
                                    {course.category}
                                </h5>
                                <h4 className="fw-bold" style={{ fontSize: "20px" }}>
                                    {course.title}
                                </h4>
                                <p className="text-primary fs-5" style={{ fontSize: "18px" }}>
                                    ${course.price}
                                </p>

                                <div className="d-grid gap-2 my-3">
                                    <Link
                                        to={`/courses-details/${course.slug}`}
                                        className="btn btn-outline-primary"
                                        style={{ height: "42px", fontSize: "15px" }}
                                    >
                                        Add to Cart
                                    </Link>
                                    <Link
                                        to={`/courses-details/${course.slug}`}
                                        className="btn btn-primary"
                                        style={{ height: "42px", fontSize: "15px" }}
                                    >
                                        Buy Course
                                    </Link>
                                </div>

                                <ul className="list-unstyled text-secondary" style={{ fontSize: "15px" }}>
                                    <li>
                                        <strong>Instructor:</strong> {course.instructor?.username}
                                    </li>
                                    <li>
                                        <strong>Lessons:</strong> {course.video?.length || 0}
                                    </li>
                                    <li>
                                        <strong>Duration:</strong> {course.duration}
                                    </li>
                                    <li>
                                        <strong>Students:</strong> {course.studentsCount}
                                    </li>
                                    <li>
                                        <strong>Language:</strong> {course.language}
                                    </li>
                                    <li>
                                        <strong>Level:</strong> {course.level}
                                    </li>
                                    <li>
                                        <strong>Certification:</strong> {course.certification ? "Yes" : "No"}
                                    </li>
                                </ul>
                            </div>

                            <Link
                                to={`/courses-details/${course.slug}`}
                                className="btn btn-sm btn-outline-secondary w-100 mt-3"
                                style={{ height: "38px", fontSize: "14px" }}
                            >
                                <i className="fas fa-share me-2"></i> Share this course
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>



    );
};

export default CoursesDetailsArea;
