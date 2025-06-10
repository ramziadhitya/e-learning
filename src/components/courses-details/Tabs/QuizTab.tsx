// components/CourseDetails/Tabs/QuizTab.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

type QuizTabProps = {
    quiz: any;
    onSubmit: (result: any) => void;
};

const QuizTab = ({ quiz, onSubmit }: QuizTabProps) => {
    const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({});
    const [quizResult, setQuizResult] = useState<any>(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (quizStarted && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (quizStarted && timeLeft === 0) {
            handleSubmitQuiz();
        }
        return () => clearTimeout(timer);
    }, [quizStarted, timeLeft]);

    const handleSubmitQuiz = async () => {
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

            const result = { score, correctAnswers: correct, totalQuestions: total, passed };
            setQuizResult(result);
            onSubmit(result);
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("Gagal menyimpan hasil quiz.");
        }
    };

    if (!quiz) return <p>No quiz available.</p>;

    return (
        <>
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

                    {quiz.questions?.map((q: any, index: number) => (
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

            {quizResult && (
                <div className="alert alert-info mt-4">
                    <p>
                        <strong>Score:</strong> {quizResult.score}%
                    </p>
                    <p>
                        <strong>Correct:</strong> {quizResult.correctAnswers} / {quizResult.totalQuestions}
                    </p>
                    <p>
                        <strong>Status:</strong> {quizResult.passed ? "Passed 🎉" : "Failed ❌"}
                    </p>
                </div>
            )}
        </>
    );
};

export default QuizTab;
