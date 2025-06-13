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
        <section className="pt-5 pb-5 bg-light">
            <div className="container" style={{ maxWidth: "1140px" }}>
                <div className="row">
                    {/* LEFT: MAIN CONTENT */}
                    <div className="col-lg-8 mb-4">
                        <div
                            className="bg-white rounded shadow-sm"
                            style={{ padding: "24px", minHeight: "650px" }}
                        >
                            {/* TABS */}
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
                                            style={{ width: "120px", textAlign: "center", height: "100%" }}
                                        >
                                            {tab}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* TAB CONTENT */}
                            <div
                                className="tab-content"
                                style={{
                                    minHeight: "500px",
                                    transition: "min-height 0.3s ease-in-out",
                                }}
                            >
                                {/* COURSE INFO */}
                                <div id="Course" className="tab-pane fade show active">
                                    <h3 style={{ fontSize: "22px", marginBottom: "16px" }}>Description</h3>
                                    {Array.isArray(course.description) ? (
                                        course.description.map((block: any, i: number) => (
                                            <p key={i} style={{ fontSize: "16px", lineHeight: "1.7" }}>
                                                {block.children?.[0]?.text || ""}
                                            </p>
                                        ))
                                    ) : (
                                        <p style={{ fontSize: "16px", lineHeight: "1.7" }}>{course.description}</p>
                                    )}
                                </div>

                                {/* CURRICULUM */}
                                <div id="Curriculum" className="tab-pane fade">
                                    <h3 style={{ fontSize: "22px", marginBottom: "16px" }}>Course Curriculum</h3>
                                    {Array.isArray(course.video) && course.video.length > 0 ? (
                                        course.video.map((vid: any, idx: number) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    width: "100%",
                                                    height: "315px",
                                                    marginBottom: "1rem",
                                                    backgroundColor: "#000",
                                                    borderRadius: "8px",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <video
                                                    controls
                                                    preload="none"
                                                    src={`${API_URL}${vid.url}`}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted">No video available.</p>
                                    )}
                                </div>

                                {/* QUIZ */}
                                <div id="Quiz" className="tab-pane fade">
                                    <h3 style={{ fontSize: "22px", marginBottom: "16px" }}>Quiz</h3>

                                    {!quizStarted ? (
                                        <div className="text-center">
                                            <button
                                                className="btn btn-success"
                                                style={{ width: "160px", height: "44px", fontSize: "16px" }}
                                                onClick={() => setQuizStarted(true)}
                                            >
                                                Start Quiz
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mb-3 text-end">
                                                <span
                                                    className="badge bg-danger"
                                                    style={{ fontSize: "16px", padding: "10px 14px" }}
                                                >
                                                    Time Left: {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:
                                                    {(timeLeft % 60).toString().padStart(2, "0")}
                                                </span>
                                            </div>

                                            {course.quizzes?.[0]?.questions?.map((q: any, index: number) => (
                                                <div
                                                    key={q.id}
                                                    className="mb-4 p-3 border rounded bg-light"
                                                    style={{ minHeight: "120px" }}
                                                >
                                                    <p className="fw-bold" style={{ fontSize: "17px" }}>
                                                        {index + 1}. {q.questionText}
                                                    </p>
                                                    {q.answers.map((ans: any) => (
                                                        <div key={ans.id} className="form-check mb-1">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name={`question-${q.id}`}
                                                                id={`answer-${ans.id}`}
                                                                value={ans.id}
                                                                checked={selectedAnswers[q.id] === ans.id}
                                                                onChange={() =>
                                                                    setSelectedAnswers((prev) => ({ ...prev, [q.id]: ans.id }))
                                                                }
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor={`answer-${ans.id}`}
                                                                style={{ fontSize: "15px" }}
                                                            >
                                                                {ans.text}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}

                                            <div className="text-end">
                                                <button
                                                    className="btn btn-primary"
                                                    style={{ width: "160px", height: "44px", fontSize: "16px" }}
                                                    onClick={handleSubmitQuiz}
                                                >
                                                    Submit Quiz
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {quizResult && (
                                        <div className="alert alert-info mt-4" style={{ fontSize: "16px" }}>
                                            <p>
                                                <strong>Score:</strong> {quizResult.score}%
                                            </p>
                                            <p>
                                                <strong>Correct:</strong> {quizResult.correctAnswers} /{" "}
                                                {quizResult.totalQuestions}
                                            </p>
                                            <p>
                                                <strong>Status:</strong>{" "}
                                                {quizResult.passed ? "Passed 🎉" : "Failed ❌"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: SIDEBAR */}
                    <div className="col-lg-4">
                        <div
                            className="bg-white rounded shadow-sm"
                            style={{ padding: "24px", minHeight: "650px" }}
                        >
                            <img
                                src={
                                    course.thumbnail?.url
                                        ? `${API_URL}${course.thumbnail.url}`
                                        : "/assets/img/default-thumbnail.jpg"
                                }
                                alt={course.title}
                                className="img-fluid rounded mb-3"
                                loading="lazy"
                                width={400}
                                height={225}
                                style={{
                                    width: "100%",
                                    height: "225px",
                                    objectFit: "cover",
                                }}
                            />

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
