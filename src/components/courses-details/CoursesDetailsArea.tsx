import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";

const API_URL = import.meta.env.VITE_API_URL;

const tabs = ["Course", "Curriculum", "Quiz"];

const CoursesDetailsArea = () => {
    const { slug } = useParams<{ slug: string }>();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({});
    const [quizResult, setQuizResult] = useState<any>(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [activeTab, setActiveTab] = useState("Course");

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

    if (loading || !course) {
        return (
            <section className="min-h-[300px] bg-gray-100 flex items-center justify-center py-10">
                <p>{loading ? "Loading..." : "Course not found"}</p>
            </section>
        );
    }


    const data = course;

    return (
        <section className="bg-gray-100 py-10 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                        {/* Tabs */}
                        <div className="flex gap-4 border-b mb-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    className={`pb-2 px-3 text-sm font-semibold border-b-2 transition ${activeTab === tab
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-blue-500"
                                        }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-4 min-h-[400px]">
                            {activeTab === "Course" && (
                                <>
                                    <h3 className="text-xl font-semibold">Description</h3>
                                    {Array.isArray(data.description) ? (
                                        data.description.map((block: any, i: number) => (
                                            <p key={i} className="text-gray-700">{block?.children?.[0]?.text || ""}</p>
                                        ))
                                    ) : (
                                        <p className="text-gray-700">{data.description}</p>
                                    )}
                                </>
                            )}

                            {activeTab === "Curriculum" && (
                                <>
                                    <h3 className="text-xl font-semibold">Course Curriculum</h3>
                                    {Array.isArray(data.video) && data.video.length > 0 ? (
                                        data.video.map((vid: any, idx: number) => (
                                            <div key={idx} className="w-full aspect-video rounded overflow-hidden">
                                                <video
                                                    controls
                                                    className="w-full h-full object-cover"
                                                    src={`${API_URL}${vid.url}`}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No video available.</p>
                                    )}
                                </>
                            )}

                            {activeTab === "Quiz" && (
                                <>
                                    <h3 className="text-xl font-semibold">Quiz</h3>

                                    {!quizStarted ? (
                                        <div className="text-center">
                                            <button
                                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                                onClick={() => setQuizStarted(true)}
                                            >
                                                Start Quiz
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="text-right mb-2">
                                                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                                                    Time Left: {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
                                                    {(timeLeft % 60).toString().padStart(2, '0')}
                                                </span>
                                            </div>

                                            {data.quizzes?.[0]?.questions?.map((q: any, index: number) => (
                                                <div key={q.id} className="p-4 bg-gray-100 rounded mb-4">
                                                    <p className="font-semibold mb-2">{index + 1}. {q.questionText}</p>
                                                    {q.answers.map((ans: any) => (
                                                        <label key={ans.id} className="block mb-1">
                                                            <input
                                                                type="radio"
                                                                className="mr-2"
                                                                name={`question-${q.id}`}
                                                                value={ans.id}
                                                                checked={selectedAnswers[q.id] === ans.id}
                                                                onChange={() =>
                                                                    setSelectedAnswers(prev => ({ ...prev, [q.id]: ans.id }))
                                                                }
                                                            />
                                                            {ans.text}
                                                        </label>
                                                    ))}
                                                </div>
                                            ))}

                                            <div className="text-right">
                                                <button
                                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                                    onClick={handleSubmitQuiz}
                                                >
                                                    Submit Quiz
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {quizResult && (
                                        <div className="mt-4 p-4 border rounded bg-blue-50 text-blue-800">
                                            <p><strong>Score:</strong> {quizResult.score}%</p>
                                            <p><strong>Correct:</strong> {quizResult.correctAnswers} / {quizResult.totalQuestions}</p>
                                            <p><strong>Status:</strong> {quizResult.passed ? "Passed 🎉" : "Failed ❌"}</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="bg-white rounded-lg shadow p-6 space-y-4">
                        <div className="w-full aspect-[16/9] rounded overflow-hidden">
                            <img
                                src={data.thumbnail?.url ? `${API_URL}${data.thumbnail.url}` : "/assets/img/default-thumbnail.jpg"}
                                alt={data.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        <h5 className="text-sm text-gray-500">{data.category}</h5>
                        <h4 className="text-lg font-bold">{data.title}</h4>
                        <p className="text-blue-600 text-xl font-semibold">${data.price}</p>

                        <div className="space-y-2">
                            <Link to={`/courses-details/${data.slug}`} className="block w-full text-center border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                                Add to Cart
                            </Link>
                            <Link to={`/courses-details/${data.slug}`} className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Buy Course
                            </Link>
                        </div>

                        <ul className="text-sm text-gray-600 space-y-1">
                            <li><strong>Instructor:</strong> {data.instructor?.username}</li>
                            <li><strong>Lessons:</strong> {data.video?.length || 0}</li>
                            <li><strong>Duration:</strong> {data.duration}</li>
                            <li><strong>Students:</strong> {data.studentsCount}</li>
                            <li><strong>Language:</strong> {data.language}</li>
                            <li><strong>Level:</strong> {data.level}</li>
                            <li><strong>Certification:</strong> {data.certification ? "Yes" : "No"}</li>
                        </ul>

                        <Link to={`/courses-details/${data.slug}`} className="text-sm text-gray-500 underline">
                            Share this course
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoursesDetailsArea;
