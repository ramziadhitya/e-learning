import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";


const CoursesDetailsArea = () => {
    const { slug } = useParams<{ slug: string }>();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({});
    const [quizResult, setQuizResult] = useState<any>(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // 15 menit = 900 detik


    const handleSubmitQuiz = async () => {
        const quiz = data.quizzes?.[0];
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
            await axios.post("http://localhost:1337/api/quiz-submissions", {
                data: {
                    userName: "Guest",              // Ganti ini kalau pakai auth
                    score: score,
                    passed: passed,
                    quiz: quiz.id,
                    totalQuestions: total,
                    correctAnswers: correct,
                }
            });

            setQuizResult({ score, correctAnswers: correct, totalQuestions: total, passed });
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("Gagal menyimpan hasil quiz. Pastikan field di Strapi sesuai.");
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
            .get(`http://localhost:1337/api/courses?${query}`)
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
            timer = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }

        if (quizStarted && timeLeft === 0) {
            handleSubmitQuiz(); // auto-submit ketika waktu habis
        }

        return () => clearTimeout(timer);
    }, [quizStarted, timeLeft]);



    if (loading) return <p>Loading...</p>;
    if (!course) return <p>Course not found</p>;

    const data = course;

    return (
        <section className="courses-details-area pt-100 pb-70">
            <div className="container">
                <div className="row">
                    {/* KIRI: Main Content */}
                    <div className="col-lg-8">
                        <div className="courses-details-content">
                            {/* Tab Menu */}
                            <ul className="nav nav-pills justify-content-center gap-3 mb-5" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a
                                        href="#Course"
                                        data-bs-toggle="tab"
                                        className="nav-link active"
                                        role="tab"
                                        style={{
                                            padding: "12px 24px",
                                            borderRadius: "30px",
                                            backgroundColor: "#e0e0e0",
                                            fontWeight: 600,
                                            color: "#333",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Course Info
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a
                                        href="#Curriculum"
                                        data-bs-toggle="tab"
                                        className="nav-link"
                                        role="tab"
                                        style={{
                                            padding: "12px 24px",
                                            borderRadius: "30px",
                                            backgroundColor: "#e0e0e0",
                                            fontWeight: 600,
                                            color: "#333",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Curriculum
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a
                                        href="#Quiz"
                                        data-bs-toggle="tab"
                                        className="nav-link"
                                        role="tab"
                                        style={{
                                            padding: "12px 24px",
                                            borderRadius: "30px",
                                            backgroundColor: "#e0e0e0",
                                            fontWeight: 600,
                                            color: "#333",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        Quiz
                                    </a>
                                </li>
                            </ul>

                            <div className="tab-content">
                                {/* Tab 1: Description */}
                                <div id="Course" className="tab-pane fade show active">
                                    <div className="description-content">
                                        <h3>Description</h3>
                                        {Array.isArray(data.description) ? (
                                            data.description.map((block: any, index: number) => (
                                                <p key={index}>{block.children?.[0]?.text || ""}</p>
                                            ))
                                        ) : (
                                            <p>{data.description || "No description available."}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Tab 2: Curriculum */}
                                <div id="Curriculum" className="tab-pane fade">
                                    <div className="course-curriculum-items">
                                        <h3>Course Curriculum</h3>
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="heading0">
                                                    <button
                                                        className="accordion-button"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapse0"
                                                        aria-expanded="true"
                                                        aria-controls="collapse0"
                                                    >
                                                        Course Video
                                                    </button>
                                                </h2>
                                                <div
                                                    id="collapse0"
                                                    className="accordion-collapse collapse show"
                                                    aria-labelledby="heading0"
                                                    data-bs-parent="#accordionExample"
                                                >
                                                    <div className="accordion-body">
                                                        {Array.isArray(data.video) && data.video.length > 0 ? (
                                                            data.video.map((vid: any, idx: number) => (
                                                                <video
                                                                    key={idx}
                                                                    controls
                                                                    style={{
                                                                        width: "100%",
                                                                        borderRadius: "8px",
                                                                        backgroundColor: "#000",
                                                                        marginBottom: "1rem",
                                                                    }}
                                                                    src={`http://localhost:1337${vid.url}`}
                                                                >
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            ))
                                                        ) : (
                                                            <p className="text-muted">Video not available.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tab 3: Quiz */}
                                <div id="Quiz" className="tab-pane fade">
                                    <div className="course-quiz-content">
                                        <h3 className="mb-4">Quiz</h3>

                                        {!quizStarted ? (
                                            <div className="text-center">
                                                <button className="btn btn-success" onClick={() => setQuizStarted(true)}>
                                                    Start Quiz
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="mb-4 text-end">
                                                    <span className="badge bg-warning fs-6">
                                                        Time Left: {Math.floor(timeLeft / 60)
                                                            .toString()
                                                            .padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                                                    </span>
                                                </div>

                                                {data.quizzes?.[0]?.questions?.map((question: any, index: number) => (
                                                    <div key={question.id} className="mb-4">
                                                        <p className="fw-bold">{index + 1}. {question.questionText}</p>
                                                        {question.answers?.map((answer: any) => (
                                                            <div key={answer.id} className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name={`question-${question.id}`}
                                                                    id={`answer-${answer.id}`}
                                                                    value={answer.id}
                                                                    onChange={() =>
                                                                        setSelectedAnswers(prev => ({
                                                                            ...prev,
                                                                            [question.id]: answer.id
                                                                        }))
                                                                    }
                                                                    checked={selectedAnswers[question.id] === answer.id}
                                                                />
                                                                <label className="form-check-label" htmlFor={`answer-${answer.id}`}>
                                                                    {answer.text}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}

                                                <button className="btn btn-primary mt-4" onClick={handleSubmitQuiz}>
                                                    Submit Quiz
                                                </button>
                                            </>
                                        )}




                                        {quizResult && (
                                            <div className="alert alert-info mt-4">
                                                <p><strong>Score:</strong> {quizResult.score}%</p>
                                                <p><strong>Correct:</strong> {quizResult.correctAnswers} / {quizResult.totalQuestions}</p>
                                                <p><strong>Status:</strong> {quizResult.passed ? 'passed 🎉' : 'Failed ❌'}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>





                            </div>
                        </div>
                    </div>

                    {/* KANAN: Sidebar (tetap rapi) */}
                    <div className="col-lg-4">
                        <div className="courses-sidebar-area sticky-style">
                            <div
                                className="card"
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "10px",
                                    padding: "20px",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                                }}
                            >
                                <img
                                    src={
                                        data.thumbnail?.url
                                            ? `http://localhost:1337${data.thumbnail.url}`
                                            : "/assets/img/default-thumbnail.jpg"
                                    }
                                    alt={data.title}
                                    className="img-fluid mb-3 rounded"
                                    style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
                                />

                                <h5 className="text-muted mb-1">{data.category}</h5>
                                <h4 className="fw-bold mb-3">{data.title}</h4>

                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <img
                                            key={i}
                                            src={`/assets/img/courses/a${i}.png`}
                                            alt={`arrow-${i}`}
                                            style={{ width: "24px" }}
                                        />
                                    ))}
                                </div>

                                <h4 className="text-primary mb-3">${data.price}</h4>

                                <div className="d-grid gap-2 mb-4">
                                    <Link to={`/courses-details/${data.slug}`} className="theme-btn">
                                        Add to Cart
                                    </Link>
                                    <Link to={`/courses-details/${data.slug}`} className="theme-btn style-2">
                                        Buy Course
                                    </Link>
                                </div>

                                <h5 className="mb-3">Course Includes:</h5>
                                <ul className="list-unstyled text-secondary mb-4">
                                    {[
                                        { icon: "chalkboard-teacher", label: "Instructor", value: data.instructor?.username },
                                        { icon: "user", label: "Lessons", value: data.video?.length || 0 },
                                        { icon: "clock", label: "Duration", value: data.duration },
                                        { icon: "user", label: "Students", value: data.studentsCount },
                                        { icon: "globe", label: "Language", value: data.language },
                                        { icon: "signal-alt", label: "Skill Level", value: data.level },
                                        { icon: "medal", label: "Certifications", value: data.certification ? "Yes" : "No" },
                                    ].map((item, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                borderBottom: index !== 6 ? "1px solid #ddd" : "none",
                                                paddingBottom: "10px",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <i className={`far fa-${item.icon} me-2`}></i> {item.label}:{" "}
                                            <span className="text-dark">{item.value}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to={`/courses-details/${data.slug}`} className="share-btn">
                                    <i className="fas fa-share me-2"></i> Share this course
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoursesDetailsArea;
