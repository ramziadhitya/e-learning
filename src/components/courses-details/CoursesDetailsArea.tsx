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
                filters: {
                    slug: { $eq: slug },
                },
                populate: {
                    video: true,
                    thumbnail: true,
                    instructor: true,
                    quizzes: {
                        populate: {
                            questions: {
                                populate: {
                                    answers: true,
                                },
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

    if (loading) return <p className="text-center py-5">Loading...</p>;
    if (!course) return <p className="text-center py-5">Course not found</p>;

    const data = course;

    return (
        <section className="pt-5 pb-5 bg-light">
            <div className="container">
                <div className="row">
                    {/* Left Content */}
                    <div className="col-lg-8 mb-4">
                        <div className="bg-white rounded p-4 shadow-sm">
                            <ul className="nav nav-pills mb-4 gap-2" id="tabs">
                                {["Course", "Curriculum", "Quiz"].map((tab) => (
                                    <li className="nav-item" key={tab}>
                                        <a
                                            href={`#${tab}`}
                                            data-bs-toggle="tab"
                                            className={`nav-link ${tab === "Course" ? "active" : ""}`}
                                            role="tab"
                                        >
                                            {tab}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="tab-content">
                                {/* Course Info */}
                                <div id="Course" className="tab-pane fade show active">
                                    <h3>Description</h3>
                                    {Array.isArray(data.description) ? (
                                        data.description.map((block: any, i: number) => (
                                            <p key={i}>{block.children?.[0]?.text || ""}</p>
                                        ))
                                    ) : (
                                        <p>{data.description}</p>
                                    )}
                                </div>

                                {/* Curriculum */}
                                <div id="Curriculum" className="tab-pane fade">
                                    <h3>Course Curriculum</h3>
                                    {Array.isArray(data.video) && data.video.length > 0 ? (
                                        data.video.map((vid: any, idx: number) => (
                                            <video
                                                key={idx}
                                                controls
                                                className="w-100 rounded my-3"
                                                src={`${API_URL}${vid.url}`}
                                                preload="none"
                                            />

                                        ))
                                    ) : (
                                        <p className="text-muted">No video available.</p>
                                    )}
                                </div>

                                {/* Quiz */}
                                <div id="Quiz" className="tab-pane fade">
                                    <h3 className="mb-3">Quiz</h3>
                                    {!quizStarted ? (
                                        <div className="text-center">
                                            <button className="btn btn-success" onClick={() => setQuizStarted(true)}>
                                                Start Quiz
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mb-3 text-end">
                                                <span className="badge bg-danger">
                                                    Time Left: {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
                                                    {(timeLeft % 60).toString().padStart(2, '0')}
                                                </span>
                                            </div>

                                            {data.quizzes?.[0]?.questions?.map((q: any, index: number) => (
                                                <div key={q.id} className="mb-4 p-3 border rounded bg-light">
                                                    <p className="fw-bold">{index + 1}. {q.questionText}</p>
                                                    {q.answers.map((ans: any) => (
                                                        <div key={ans.id} className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name={`question-${q.id}`}
                                                                id={`answer-${ans.id}`}
                                                                value={ans.id}
                                                                checked={selectedAnswers[q.id] === ans.id}
                                                                onChange={() =>
                                                                    setSelectedAnswers(prev => ({ ...prev, [q.id]: ans.id }))
                                                                }
                                                            />
                                                            <label className="form-check-label" htmlFor={`answer-${ans.id}`}>
                                                                {ans.text}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}

                                            <div className="text-end">
                                                <button className="btn btn-primary" onClick={handleSubmitQuiz}>
                                                    Submit Quiz
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {quizResult && (
                                        <div className="alert alert-info mt-4">
                                            <p><strong>Score:</strong> {quizResult.score}%</p>
                                            <p><strong>Correct:</strong> {quizResult.correctAnswers} / {quizResult.totalQuestions}</p>
                                            <p><strong>Status:</strong> {quizResult.passed ? "Passed 🎉" : "Failed ❌"}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-lg-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <img
                                src={data.thumbnail?.url ? `${API_URL}${data.thumbnail.url}` : "/assets/img/default-thumbnail.jpg"}
                                alt={data.title}
                                className="img-fluid rounded mb-3"
                                loading="lazy"
                                style={{ objectFit: "cover", height: "200px", width: "100%" }}
                            />
                            <h5 className="text-muted">{data.category}</h5>
                            <h4 className="fw-bold">{data.title}</h4>
                            <p className="text-primary fs-5">${data.price}</p>

                            <div className="d-grid gap-2 my-3">
                                <Link to={`/courses-details/${data.slug}`} className="btn btn-outline-primary">
                                    Add to Cart
                                </Link>
                                <Link to={`/courses-details/${data.slug}`} className="btn btn-primary">
                                    Buy Course
                                </Link>
                            </div>

                            <ul className="list-unstyled text-secondary">
                                <li><strong>Instructor:</strong> {data.instructor?.username}</li>
                                <li><strong>Lessons:</strong> {data.video?.length || 0}</li>
                                <li><strong>Duration:</strong> {data.duration}</li>
                                <li><strong>Students:</strong> {data.studentsCount}</li>
                                <li><strong>Language:</strong> {data.language}</li>
                                <li><strong>Level:</strong> {data.level}</li>
                                <li><strong>Certification:</strong> {data.certification ? "Yes" : "No"}</li>
                            </ul>

                            <Link to={`/courses-details/${data.slug}`} className="btn btn-sm btn-outline-secondary w-100 mt-3">
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
