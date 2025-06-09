import { useState, useEffect } from "react";

const CourseDetailsTabs = ({ data }: { data: any }) => {
    const [activeTab, setActiveTab] = useState<"Course" | "Curriculum" | "Quiz">("Course");
    const [quizStarted, setQuizStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: string }>({});

    useEffect(() => {
        let timer: any;
        if (quizStarted && activeTab === "Quiz") {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [quizStarted, activeTab]);

    const handleSubmitQuiz = () => {
        console.log("Selected answers:", selectedAnswers);
        // TODO: Submit answers to backend
    };

    return (
        <div>
            {/* Tab Navigation */}
            <ul className="nav nav-tabs">
                {["Course", "Curriculum", "Quiz"].map((tab) => (
                    <li className="nav-item" key={tab}>
                        <button
                            className={`nav-link ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab as any)}
                        >
                            {tab === "Course" ? "Course Info" : tab}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Tab Content */}
            <div
                className="tab-content mt-3"
                style={{ minHeight: "600px", transition: "min-height 0.3s ease-in-out" }}
            >
                {activeTab === "Course" && (
                    <div className="tab-pane fade show active">
                        <h3>Description</h3>
                        {Array.isArray(data.description) ? (
                            data.description.map((block: any, i: number) => (
                                <p key={i}>{block?.children?.[0]?.text || ""}</p>
                            ))
                        ) : (
                            <p>{data.description}</p>
                        )}
                    </div>
                )}

                {activeTab === "Curriculum" && (
                    <div className="tab-pane fade show active">
                        <h3>Course Curriculum</h3>
                        {Array.isArray(data.video) && data.video.length > 0 ? (
                            data.video.map((vid: any, idx: number) => (
                                <div
                                    key={idx}
                                    className="rounded overflow-hidden my-3"
                                    style={{ aspectRatio: "16/9", backgroundColor: "#f1f1f1" }}
                                >
                                    <video
                                        controls
                                        className="w-100 h-100 object-cover"
                                        src={`${import.meta.env.VITE_API_URL}${vid.url}`}
                                        preload="metadata"
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No video available.</p>
                        )}
                    </div>
                )}

                {activeTab === "Quiz" && (
                    <div className="tab-pane fade show active">
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
                                        Time Left: {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:
                                        {(timeLeft % 60).toString().padStart(2, "0")}
                                    </span>
                                </div>

                                {data.quizzes?.[0]?.questions?.map((q: any, index: number) => (
                                    <div key={q.id} className="mb-4 p-3 border rounded bg-light">
                                        <p className="fw-bold">
                                            {index + 1}. {q.questionText}
                                        </p>
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
                                                        setSelectedAnswers((prev) => ({ ...prev, [q.id]: ans.id }))
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDetailsTabs;
